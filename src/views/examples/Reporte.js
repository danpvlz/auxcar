import React from "react";
import { Link } from 'react-router-dom'
// reactstrap components
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Button
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Animate from "animate.css";

class Reporte extends React.Component {
    state = {
      fallas: [],
      asistenciaPrecio: 0.0,
      reparacion: 0.0,
      subtotal: 0.0
    }

  componentDidMount(){
    if(this.props.location.fallas_identificadas!=undefined){
     this.init();
    }else{
      this.props.history.push('/inicio');
    }
  }
  //https://app-5588aec6-1c6c-4e24-93ee-31bb3a4c1c21.cleverapps.io/api/auxilio
  //https://apiservicio.herokuapp.com/api/fallas-vehiculares
  init=async()=>{
    let response = await fetch(`https://app-5588aec6-1c6c-4e24-93ee-31bb3a4c1c21.cleverapps.io/api/fallas-vehiculares`, {
      method: 'POST',
      body: `{
        "fallas": [${this.props.location.fallas_identificadas.toString()}]
      }`,
      headers:{
        'Content-Type': 'application/json'
      }
    });

    let data = await response.json();
    let reparacion=0.0;
    data.map(falla=>{
      reparacion+=falla.costo;
    });
    
    this.setState({
      asistenciaPrecio: this.props.location.asistenciaPrecio,
      reparacion: reparacion,
      subtotal: reparacion+this.props.location.asistenciaPrecio,
      fallas: data
    });
  }
  
  render() {
      //section section-lg
      //section section-lg bg-gradient-default
    return (
        <>
            <Row className="justify-content-center mt-4 ">
              <Col className="text-center mb-4 animate__animated animate__fadeInDown" sm="12">
                <h2 className="display-3 text-white">Reporte de diagnóstico vehicular</h2>
                <p className="text-white">
                  El diagnóstico es el siguiente:   
                </p>
              </Col>
              <Col lg="7 mb-4">
                <Card className="shadow animate__animated animate__fadeInUp">
                  <CardBody>
                      <div className="table-responsive-sm ">
                          <table className="table w-auto " >
                              <thead className="table-borderless ">
                              <tr>
                                  <th className="h6">Falla</th>
                                  <th className="h6">Costo de reparación</th>
                                  <th className="h6">Causa probable</th>
                              </tr>
                              </thead>
                              <tbody className="table-borderless  description mt-3">
                              {
                              this.state.fallas.map((falla, i)=>{
                                if(falla.costo!=0){
                                return(
                                <tr key={i+"_tr"}>
                                  <td>{falla.descripcion}</td>
                                  <td>S/.{falla.costo}</td>
                                  <td>{falla.causa}</td>
                                </tr>);
                                }else{
                                  return(
                                    <tr key={i+"_tr"} className="text-danger">
                                      <td><strong>{falla.descripcion}</strong></td>
                                      <td><strong>Pendiente</strong></td>
                                      <td><strong>{falla.causa}</strong></td>
                                    </tr>);
                                }
                              })}
                              </tbody>
                          </table>
                      </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="shadow shadow-lg animate__animated animate__fadeInUp">
                  <CardBody>
                    <div className="row">
                      <div className="col"><h5 className="mt-3">Reparación</h5></div>
                        <div className="col text-right">
                          <p className="mt-3">
                            {this.state.reparacion==0 ? "Pendiente" : `S/.${this.state.reparacion}`}
                            
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col"><h5 className="mt-3">Asistencia</h5></div>
                        <div className="col text-right">
                          <p className="mt-3">
                            S/.{this.state.asistenciaPrecio}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col"><h5 className="mt-3">Subtotal*</h5></div>
                        <div className="col text-right"><p className="mt-3">
                          S/.{this.state.subtotal}
                        </p></div>
                      </div>
                      <div className="row">
                        <Col className="text-left" sm="12">
                        <small>(*) Los costos por asistencia varían por la distancia a recorrer por el mecánico.</small>
                        </Col>
                        <Col className="text-left" sm="12">
                        <small>(**)El subtotal no considera el costo de repuestos nuevos, en caso se requiera.</small>
                        </Col>
                      </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <div className="btn-wrapper animate__animated animate__fadeInDown">
                    <Button
                      className="btn-white mt-3 mt-md-0"
                      to='/inicio'
                      tag={Link}
                    >
                      Cerrar reporte
                    </Button>
                    <Button
                      color="success"
                      to={{pathname:'/solicitud-auxilio',
                      asistenciaDistrito:this.props.location.asistenciaDistrito,
                      codDistrito:this.props.location.codDistrito,
                      costo: this.state.subtotal,
                      fallas: this.props.location.fallas_identificadas
                    }}
                      tag={Link}
                    >
                      Solicitar mecánico
                    </Button>
                  </div>
                </div>
              </Col>
              </Row>

        </>
      );
  }
}

export default Reporte;