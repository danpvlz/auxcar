import React from "react";
import {Link} from 'react-router-dom';

import {
    Card,
    CardBody,
    Col,
    Button
} from 'reactstrap'
import BotonAsistencia from "./BotonAsistencia";

class ResultadoEncuesta extends React.Component {
  render() {
    var gradiente = "bg-success align-items-center";
    var icono = "ni ni-like-2 ni-3x";
    var titulo = "Su reporte está listo";
    var clase = "align-items-center mt-4 animate__animated animate__slideInDown animate__fast";
    if(this.props.estado===0){
      gradiente = "bg-danger align-items-center";
      icono = "fa fa-exclamation-triangle fa-3x";
      titulo = "No se puede determinar!";
      clase = "align-items-center mt-4 animate__animated animate__flipInX animate__fast";
    }
    
    return (
      <Col className={clase} sm="5">
        <Card className={gradiente}> 
            <CardBody className="text-white">
                <div className="py-3 text-center">
                <i className={icono} />
                <p className="heading mt-5">{titulo}</p>  
                </div>
                {
                  this.props.estado===0 ? 
                  <Button
                  className="text-danger"
                  color="neutral"
                  type="button"
                  block
                  to={
                    {
                      pathname: "/reporte-diagnostico",
                      fallas_identificadas: [999],
                      asistenciaPrecio: this.props.asistenciaPrecio,
                      asistenciaDistrito: this.props.asistenciaDistrito,
                      codDistrito: this.props.codDistrito
                    }
                  }
                  tag={Link}
                  >
                  Pedir auxilio
                </Button>
                :
                ""
                }
                </CardBody>
                
                <div className="modal-footer">
                <div className="btn-wraper">
                    <Button
                    className="text-white"
                    color="link"
                    type="button"
                    to="/"
                    tag={Link}
                    >
                    Cerrar
                  </Button>
                  <BotonAsistencia 
                  formatearData={this.props.formatearData}
                  tipo={this.props.estado} 
                  fallas_identificadas={this.props.fallas_identificadas} 
                  asistenciaDistrito={this.props.asistenciaDistrito} 
                  asistenciaPrecio={this.props.asistenciaPrecio} 
                  codDistrito={this.props.codDistrito}/>
                  </div>
                </div>
        </Card>
      </Col>
    );
  }
}

export default ResultadoEncuesta;
                  