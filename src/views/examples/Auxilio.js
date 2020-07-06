import React from "react";
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Row,
  Button,
  Modal
} from "reactstrap";

// core components
import Solicitud from "../partials/Solicitud";
import Finalizado from "../partials/Finalizado";

class Auxilio extends React.Component {
    constructor(){
        super();
        this.state = {
            latitud: 0,
            longitud: 0,
            src: "https://maps.google.com/maps?q=-6.771278088155282,-79.84366000692792&z=15&output=embed",
            cliente: "",
            contacto: "",
            referencia: "",
            done: false,
            animar: false,
            showError: false,
            mensajeError: "Por favor, complete todos los campos."
        }
    }
    
  componentDidMount() {
    if(this.props.location.codDistrito!=undefined){
      this.getUbicacion();
    }else{
      this.props.history.push('/');
    }
  }

  getUbicacion=()=>{
    if(navigator.geolocation) {
      navigator.geolocation.watchPosition((position)=>{
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        let src="https://maps.google.com/maps?q="+position.coords.latitude+","+position.coords.longitude+"&z=15&output=embed";
        this.setState({latitud: position.coords.latitude, longitud: position.coords.longitude, src: src});
      },()=>{this.setState({mensajeError: "Por favor, otorgue permisos de geolocalización."});});
    }else{
      this.setState({mensajeError: "Geolocalización no disponible"});
    }
  }
  
  handleChange = (e) => {
    switch (e.target.id) {
        case "txtCliente":
        this.setState({cliente: e.target.value});
        break;
        case "txtContacto":
        this.setState({contacto: e.target.value});
        break;
        case "txtReferencia":
        this.setState({referencia: e.target.value});
        break;
    }
  };

  alertState=(e)=>{
    if(e && e.target.textContent == "×"){
      this.setState({showError: false});
    }else{
      window.scroll(0,0);
      this.setState({showError: true});
    }
  }


  handleSubmit=()=>{
    if(this.state.cliente.length>0 &&
      this.state.contacto.length>0 &&
      this.state.referencia.length>0 && 
      this.state.latitud != 0 && 
      this.state.longitud != 0){
      fetch(`https://app-5588aec6-1c6c-4e24-93ee-31bb3a4c1c21.cleverapps.io/api/diagnostico`, {
          method: 'POST',
          body: `{
              "distrito": ${this.props.location.codDistrito},
              "costo": ${this.props.location.costo},
              "fallas": [${this.props.location.fallas.toString()}]
          }`,
          headers:{
              'Content-Type': 'application/json'
          }
      }).then(response=>{
        return response.json();
      })
      .then(JSONresponse=>{
        fetch("https://app-5588aec6-1c6c-4e24-93ee-31bb3a4c1c21.cleverapps.io/api/auxilio",
          {
            method: 'POST',
            body: `
            {
                "lat": ${this.state.latitud},
                "long": ${this.state.longitud},
                "cliente": "${this.state.cliente}",
                "contacto": "${this.state.contacto.substr(4)}",
                "diagnostico": ${JSONresponse.insertedId},
                "referencia": "${this.state.referencia}"
            }
            `,
            headers:{
                'Content-Type': 'application/json'
            }
          }).then(response=>{
            return response.json(); 
          }).then(JSONresponse=>{
            return JSONresponse.status;
          }).then(status=>{
            if(status==200){
              this.setState({animar: true});
              setTimeout(() => {
                this.setState({done:true});
              }, 500);
            }
          }).catch(e=>console.log(e));
      })
      .catch(e=>console.log(e));      
    }else{
      this.alertState();
    }
  }

  render() {
    return (
      <>
        <Row className="justify-content-center">
          {
            this.state.done ? <Finalizado /> : 
            <Solicitud 
            showError={this.state.showError}
            mensajeError={this.state.mensajeError}
            animar={this.state.animar}
            distrito={this.props.location.asistenciaDistrito}
            handleChange={this.handleChange}
            src={this.state.src}
            alertState={this.alertState}
            handleSubmit={this.handleSubmit}/>
          }
        </Row>
      </>
    );
  }
}

export default Auxilio;
