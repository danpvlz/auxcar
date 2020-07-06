
import React from "react";
import {render} from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "animate.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Inicio from "views/indexSections/Inicio.js";
import Asistencia from "views/indexSections/Asistencia.js";
import Ubicacion from "views/indexSections/Ubicacion.js";
import Reporte from "views/indexSections/Reporte.js";
import Auxilio from "views/indexSections/Auxilio.js";

import {
  Container
} from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";


//<Redirect to="/" />
class App extends React.Component{
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render(){
    return(
      <BrowserRouter>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative"  >
            <section className="section section-lg section-shaped" style={{"minHeight": 100+"vh"}}>
            <div className="shape shape-style-1 bg-default ">
            <img
              alt="..."
              className="img-center "
              src={require("assets/img/brand/background-index.jpeg")}
              style={{"opacity": 0.3}}
            />
            </div>
              <Container className="align-items-center">
                <Switch>
                      <Route path="/" exact render={props => <Inicio {...props} />} />

                      <Route
                        path="/inicio"
                        exact
                        render={props => <Inicio {...props} />}
                      />

                      <Route
                        path="/ubicacion"
                        exact
                        render={props => <Ubicacion {...props} />}
                      />

                      <Route
                        path="/asistencia-vehicular"
                        exact
                        render={props => <Asistencia {...props} />}
                      />

                      <Route
                        path="/reporte-diagnostico"
                        exact
                        render={props => <Reporte {...props} />}
                      />

                      <Route
                        path="/solicitud-auxilio"
                        exact
                        render={props => <Auxilio {...props} />}
                      />

                      <Redirect to="/" />

                      </Switch>  
              </Container>
            </section>
          </div>
        </main>
      </BrowserRouter>
    );
  }
}


render(<App />, document.getElementById("root"));