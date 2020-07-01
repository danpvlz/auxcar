import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Inicio extends React.Component {
  state = {};

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative" >
            <section className="section section-lg section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
              <Container className="py-lg-md d-flex mt-5 align-items-center mb-4">
                <div className="col">
                  <Row className="align-items-center justify-content-center">
                    <Col lg="6" className="text-center">
                      <h1 className="display-3 text-white">
                        Hola!{" "}
                        <span>Bienvenido a <strong>Motriztente</strong>, tu asistente vehicular</span>
                      </h1>
                      <p className="lead text-white">
                      A continuación te haremos algunas preguntas para realizar el diagnóstico de tu vehículo                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          to="/ubicacion"
                          tag={Link}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-car" />
                          </span>
                          <span className="btn-inner--text">
                            Empezar
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
          </div>
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default Inicio;
