import React from "react";
import {Link} from 'react-router-dom';

import {
    Card,
    CardBody,
    CardFooter,
    Button
} from 'reactstrap'
import BotonAsistencia from "./BotonAsistencia";
import Animate from "animate.css";

class ResultadoEncuesta extends React.Component {
  render() {
    var gradiente = "bg-gradient-success";
    var icono = "ni ni-like-2 ni-3x";
    var titulo = "Su reporte está listo";
    var clase = "animate__animated animate__slideInDown animate__fast";
    if(this.props.estado===0){
      gradiente = "bg-gradient-danger";
      icono = "fa fa-exclamation-triangle fa-3x";
      titulo = "No se puede determinar!";
      clase = "animate__animated animate__flipInX animate__fast";
    }
    
    return (
      <div className={clase}>
        <Card className={gradiente} sm="6">
            <CardBody className="text-white">
                <div className="py-3 text-center">
                <i className={icono} />
                <p className="heading mt-5">{titulo}</p>  
                </div>
            </CardBody>
            <CardFooter className={gradiente}>
                <Button
                className="text-white ml-auto"
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
            </CardFooter>
        </Card>
      </div>
    );
  }
}

export default ResultadoEncuesta;
                  