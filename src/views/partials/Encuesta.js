import React from "react";
import Checkoxes from "../partials/Checkboxes.js"
import Opcion from "../partials/Opcion.js"

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button
} from 'reactstrap'
import Animate from 'animate.css'
class Encuesta extends React.Component {
  render() {
    var clase = "shadow shadow-lg--hover animate__animated animate__fadeInUp animate__fast";
    if(this.props.animar){
      clase = this.props.estado===0 ?
      "shadow shadow-lg--hover animate__animated animate__flipOutX animate__fast"
      :
      "shadow shadow-lg--hover animate__animated animate__slideOutUp animate__fast"
    }
    return (
      <>
        <Card className={clase} style={{display: 'flex'}}>
            <form >
                <CardHeader>
                <h4 className="display-4">
                    <strong>Motriztente</strong>
                </h4>
                <h5>
                    ¿Por qué motivo desea asistencia vehicular?
                </h5>
                </CardHeader>
                <CardBody >
                {
                this.props.preguntas[0].predecesor === 0 ?
                this.props.preguntas.map(dato =>{ 
                    return <Checkoxes key={dato.id} pregunta={dato} valor={dato.id} onClick={this.props.onCheckbox} />
                }) :
                <Opcion key={this.props.preguntas[0].id} pregunta={this.props.preguntas[0]} valor={this.props.preguntas[0].id} onClick={this.props.onRadioButton}/>
                }
                </CardBody>
                <CardFooter>
                <Button id="btn-1" color="neutral" type="button" 
                onClick={this.props.handleBack}>
                    Atrás
                </Button>
                <Button id="btn-2" color="primary" type="button" onClick={this.props.handleNext}>
                    Siguiente
                </Button>
                </CardFooter>
            </form>
        </Card>
      </>
    );
  }
}

export default Encuesta;