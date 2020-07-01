import React from "react";
import {Link} from 'react-router-dom'
import {
    
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Col
} from 'reactstrap';
import Animate from 'animate.css'
import {TextField,InputAdornment} from '@material-ui/core';
import NumberFormat from 'react-number-format';
class Solicitud extends React.Component {
  render() {
    var animacion = this.props.animar ? "shadow shadow-lg--hover animate__animated animate__slideOutUp animate__fast" : "shadow shadow-lg--hover animate__animated animate__fadeInUp";
    return (
      <Col lg="6">
        <Card className={animacion}>
              <form >
              <CardHeader >
              <h4 className="display-4">
                  <strong>SOLICITUD DE AUXILIO</strong>
              </h4>
              </CardHeader>
              <CardBody>
              <FormGroup>
                  <TextField InputProps={{
                      startAdornment: <InputAdornment position="start">
                          <i className="fa fa-user"></i>
                      </InputAdornment>,
                    }}
                    onChange={this.props.handleChange}
                    fullWidth id="txtCliente" label="Nombre completo"/>
              </FormGroup>
              <div className="row">
                <div className="col-sm-6">
                  <NumberFormat InputProps={{
                          startAdornment: <InputAdornment position="start">
                              <i className="fa fa-phone "></i>
                          </InputAdornment>,
                        }}
                        onChange={this.props.handleChange}
                        id="txtContacto"
                        customInput={TextField} label="Número de contacto" format="+51 #########"/>
                  </div>
                <div className="col-sm-6">
                  <TextField
                  InputProps={{
                      startAdornment: <InputAdornment position="start">
                          <i className="fa fa-map-marker"></i>
                      </InputAdornment>,
                      readOnly: true
                    }}
                  id="standard-basic" 
                  label="Distrito" 
                  value={this.props.distrito}/>
                  </div>
              </div>
              <FormGroup className="mt-2">
              <small>Ubicación</small>
              <iframe id="mapa" src={this.props.src} width="100%" height="300" style={{border:0+"px"}} aria-hidden="false"></iframe>                        
              </FormGroup>
              <FormGroup>
                  <TextField  InputProps={{
                      startAdornment: <InputAdornment position="start">
                          <i className="fa fa-location-arrow "></i>
                      </InputAdornment>,
                  }}
                  onChange={this.props.handleChange}
                  fullWidth 
                  multiline
                  id="txtReferencia" 
                  label="Referencia"/>
              </FormGroup>
              </CardBody>
              <CardFooter>
              <Button id="btn-1"
              to='/'
              tag={Link}
              className="btn-white" type="button">
                  Cancelar
              </Button>
              <Button id="btn-2" color="success" type="button" onClick={this.props.handleSubmit}>
                  Solicitar auxilio
              </Button>
              </CardFooter>
              </form>
          </Card>
      </Col>
    );
  }
}

export default Solicitud;