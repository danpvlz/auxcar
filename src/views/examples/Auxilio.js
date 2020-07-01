import React from "react";
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
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
            animar: false
        }
    }
  componentDidMount() {
    if(this.props.location.codDistrito){
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;
      this.getUbicacion();
    }else{
      this.props.history.push('/');
    }
  }

  getUbicacion=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        let src="https://maps.google.com/maps?q="+position.coords.latitude+","+position.coords.longitude+"&z=15&output=embed";
        this.setState({latitud: position.coords.latitude, longitud: position.coords.longitude, src: src});
        },()=>{console.log("SIN PERMISO");});
    }else{
        console.log("Geolocalización no disponible");
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

  handleSubmit=async()=>{
    
    if(this.state.cliente.length>0 &&
      this.state.contacto.length>0 &&
      this.state.referencia.length>0){
      
      let response = await fetch(`https://apiservicio.herokuapp.com/api/diagnostico`, {
          method: 'POST',
          body: `{
              "distrito": ${this.props.location.codDistrito},
              "costo": ${this.props.location.costo},
              "fallas": [${this.props.location.fallas.toString()}]
          }`,
          headers:{
              'Content-Type': 'application/json'
          }
      });
      let registroDiagnostico = await response.json();
      response = await fetch("https://apiservicio.herokuapp.com/api/auxilio",
      {
          method: 'POST',
          body: `
          {
              "lat": ${this.state.latitud},
              "long": ${this.state.longitud},
              "cliente": "${this.state.cliente}",
              "contacto": "${this.state.contacto.substr(3)}",
              "diagnostico": ${registroDiagnostico.insertedId},
              "referencia": "${this.state.referencia}"
          }
          `,
          headers:{
              'Content-Type': 'application/json'
          }
      });
      let stateRegistro = await response.json();
      
      if(stateRegistro.status==200){
        this.setState({animar: true});
        setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.setState({done:true});
      }, 500);
      }
    }
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                {
                  this.state.done ? <Finalizado /> : 
                  <Solicitud 
                  animar={this.state.animar}
                  distrito={this.props.location.asistenciaDistrito}
                  handleChange={this.handleChange}
                  src={this.state.src}
                  handleSubmit={this.handleSubmit}/>
                }
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Auxilio;
