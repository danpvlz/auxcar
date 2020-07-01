
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Inicio from "views/examples/Inicio.js";
import Asistencia from "views/examples/Asistencia.js";
import Ubicacion from "views/examples/Ubicacion.js";
import Reporte from "views/examples/Reporte.js";
import Auxilio from "views/examples/Auxilio.js";

//<Redirect to="/" />
ReactDOM.render(
  <BrowserRouter>
    <Switch>
    
      <Redirect to="/" />
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
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
