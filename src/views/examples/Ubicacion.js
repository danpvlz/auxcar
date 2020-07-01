import React from "react";
import distritos from '../../data/distritos.json';
// reactstrap components
import {
  Col,
  Container,
  Row,
  Button
} from "reactstrap";

import Select from "react-select";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Ubicacion extends React.Component {
  constructor(){
    super();
    this.state={
      distritos: [],
      distritoSelected: "",
      distritoName: "",
      costoDistrito: 0.0
    }        
  }

  handleProvinciaChange=(value)=>{
    const distritos_data = distritos.filter((distrito) => distrito.provincia  == value.value);
    this.setState({distritos: distritos_data, distritoSelected: "", costoDistrito: 0.0});
  }

  handleChange=(val)=>{
    this.setState({costoDistrito: val.costo, distritoSelected: val.value, distritoName: val.label});
  }

  handleClick=()=>{
    if(this.state.costoDistrito>0){
    this.props.history.push({
        pathname: "/asistencia-vehicular",
        asistenciaPrecio: this.state.costoDistrito,
        asistenciaDistrito: this.state.distritoName,
        codDistrito: this.state.distritoSelected
      });
    }
  }

  componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
}

  
  render() {
    const provincias = [
        { value: '1', label: 'Ferreñafe' },
        { value: '2', label: 'Lambayeque' },
        { value: '3', label: 'Chiclayo' }
      ]
      
    return (
        <>
          <DemoNavbar />
          <main ref="main" >
            <div className="position-relative">
            <section className="section section-lg bg-gradient-default">
            <Container className="mt-3">
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/theme/location.png")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3 className="display-3 text-white">Motriztente</h3>
                    <p className="text-white">
                    ¿Dónde te encuentras?
                    </p>
                    <form action="">
                    <div className="mt-5">
                        <Select options={provincias}
                          onChange={this.handleProvinciaChange}
                          label="Single select"
                          placeholder="Provincia"
                          onFocus={e => this.setState({ searchAltFocused: true })}
                          onBlur={e => this.setState({ searchAltFocused: false })}
                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: '#1aae6fc7',
                            },
                          })}
                          />
                      
                    </div>
                    <div className="mt-3" >
                      <Select options={this.state.distritos}
                        onChange={this.handleChange}
                        placeholder="Distrito"
                        onFocus={e => this.setState({ searchAltFocused: true })}
                        onBlur={e => this.setState({ searchAltFocused: false })}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#1aae6fc7',
                          },
                        })}
                        />
                    </div>
                    <div className="mt-4">
                    <Button
                          outline  type="button"
                          color="success"
                          onClick={this.handleClick}
                        >
                          <span className="btn-inner--text">
                            Seguir
                          </span>
                        </Button>
                        
                    </div>
                    </form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          </div>
          <SimpleFooter />
          </main>
        </>
      );
  }
}

export default Ubicacion;