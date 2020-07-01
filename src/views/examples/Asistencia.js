import React from "react";

// reactstrap components
import {
Container,
Row,
Col,
Card,
CardBody,
CardFooter,
Button
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Encuesta from "../partials/Encuesta.js";
import ResultadoEncuesta from "../partials/ResultadoEncuesta.js";
import datos from '../../data/datos.json';

class Asistencia extends React.Component {
    constructor(){
        super();
        this.state = {
            predecesor: [0],
            preguntas:[],
            seleccionados: [0],
            pendientes: [], //no desplegadas
            descartados: [],
            identificados: [],
            rbSelected: false,
            mostrar: 0,
            animar: false,
            history: [
                {"seleccionados": []}
            ],
        }
    }

    formatearData=async()=>{
       await this.setState({
            predecesor: [0],
            preguntas:[],
            seleccionados: [0],
            pendientes: [], //no desplegadas
            descartados: [],
            identificados: [],
            rbSelected: false,
            mostrar: 0,
            animar: false,
            history: [
                {"seleccionados": []}
            ],
        });
        this.cargarPreguntas();
    }

    cargarPreguntas=()=>{
        var hijos=[];
        var pendientes = this.state.pendientes;
        pendientes = pendientes.concat(this.state.seleccionados);
        var preguntas_mostrar=[];
        
        datos.map((preg)=> 
        {
            if( this.state.seleccionados.includes(preg.predecesor) && !this.state.descartados.includes(preg.id) && !this.state.identificados.includes(preg.id)){
                if(this.state.predecesor.includes(0)){
                preguntas_mostrar.push(preg); }
                if(!pendientes.includes(preg.id)) hijos.push(preg.id);
            }
        }
        );
        pendientes=hijos.sort().concat(pendientes).filter(val=> !this.state.seleccionados.includes(val));
        if(pendientes.length>0) if(!this.state.predecesor.includes(0)) preguntas_mostrar = [datos.find(p=>p.id==pendientes[0])];
        
        if(preguntas_mostrar.length==0){
            this.setState({animar:true});document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.main.scrollTop = 0;
            setTimeout(()=>{this.state.predecesor==0 ? this.setState({preguntas: preguntas_mostrar,seleccionados:[]}) : this.setState({preguntas: preguntas_mostrar,seleccionados:[],pendientes:  pendientes});
            }, 500);
        }else{
            this.state.predecesor==0 ? this.setState({preguntas: preguntas_mostrar,seleccionados:[]}) : this.setState({preguntas: preguntas_mostrar,seleccionados:[],pendientes:  pendientes});
        }

        /*if(pendientes.length>0 && preguntas_mostrar.length==0){
            var identificados = this.state.identificados;
            identificados=identificados.concat(this.state.predecesor);
            this.setState({identificados: identificados});
            //console.log(identificados);
        }*/
    }

    handleChecked=(e)=>{
        var seleccionados = this.state.seleccionados;
        if(e.target.checked){
            seleccionados.push(parseInt(e.target.value))
        }else{
            seleccionados=seleccionados.filter(val=>val!=e.target.value);
        }
        this.setState({seleccionados: seleccionados.sort(),predecesor: [seleccionados[0]]});
    }

    handleRadioButton=(e)=>{
        var seleccionados = this.state.seleccionados;
        var pendientes = this.state.pendientes;
        var descartados = this.state.descartados;
        var rbSelected = false;
        if(!descartados.includes(parseInt((e.target.name)))) descartados.push(parseInt(e.target.name));
        if(e.target.value=="si"){
            seleccionados.splice(0,seleccionados.length,parseInt(e.target.name))
            if (!pendientes.includes(parseInt(e.target.name))) pendientes.splice(0,0,parseInt(e.target.name))
            rbSelected = true;
        }else{
            seleccionados.push(parseInt(pendientes[1]));
            seleccionados=seleccionados.filter(val=>val!=(e.target.name));
            pendientes.splice(0,1);
            seleccionados=[this.state.preguntas.filter((preg) => preg.id == e.target.name)[0].predecesor];
            rbSelected=false;
        }
        this.setState({seleccionados: seleccionados.sort(),predecesor: [seleccionados[0]],descartados:descartados, rbSelected: rbSelected});
    }

    handleNext= (e) =>{
        if(this.state.seleccionados.length>0){   
            //HISTORIAL
            var seleccionados = this.state.seleccionados; 
            var historia = this.state.history;
            historia.push({"seleccionados":seleccionados});
            this.setState({history: historia});  

            //PREGUNTAS SIN HIJOS Y MARCADAS CON SÍ
            var ultimo_descartado = this.state.descartados[this.state.descartados.length-1];
            var verificar_tope = datos.filter(d=>d.predecesor==ultimo_descartado);
            var identificados = this.state.identificados;

            if(verificar_tope.length==0 && !identificados.includes(ultimo_descartado)){ //NO HAY HIJOS
                var pregunta = datos.find(f=>f.id==ultimo_descartado);
                if(pregunta!= undefined){
                    if(this.state.rbSelected){
                        //MARCÓ SÍ
                        if(pregunta.valor_si != undefined ) {identificados.push(pregunta.valor_si)}
                    }else{
                        //MARCÓ NO
                        if(pregunta.valor_no != undefined ) {identificados.push(pregunta.valor_no)}
                    }
                    
                }    
            }
        this.cargarPreguntas();
           
    }
}
    
    handleBack=()=>{
       /* var historial = this.state.history;
        if(historial.length>1){        
        historial = historial.slice(0,historial.length-1);
        const nuevos_seleccionados = historial[historial.length-1].seleccionados;
        this.setState({seleccionados: nuevos_seleccionados, history: historial});
       
            console.log("splice");
            console.log(historial); 
            console.log("seleccionados");
            console.log(nuevos_seleccionados); 
            this.cargarPreguntas();
            this.getFallasIdentificadas();
        }*/
        
        console.log("identificados...");
        console.log(this.state.identificados.toString());
        console.log("descartados...");
        console.log(this.state.descartados);
    }

    componentDidMount() {
        if(this.props.location.asistenciaPrecio!=undefined){
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.main.scrollTop = 0;
            this.cargarPreguntas();
        }else{
            this.props.history.push('/');
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
            <Container className="pt-lg-5">
              <Row className="justify-content-md-center">
                <Col className="justify-content-center" sm="6" style={{display: 'flex'}}>
                    {
                    this.state.preguntas.length > 0 ? 
                    <Encuesta estado={this.state.identificados.length} animar={this.state.animar} handleBack={this.handleBack} handleNext={this.handleNext} preguntas={this.state.preguntas} onCheckbox={this.handleChecked} onRadioButton={this.handleRadioButton}  />
                    :
                    <ResultadoEncuesta 
                    formatearData={this.formatearData}
                    estado={this.state.identificados.length}
                    fallas_identificadas={this.state.identificados}
                    asistenciaPrecio={this.props.location.asistenciaPrecio}
                    asistenciaDistrito={this.props.location.asistenciaDistrito}
                    codDistrito={this.props.location.codDistrito}
                    />
                    }
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Asistencia;

/*
    <Badge className="text-uppercase" color="danger" pill>
        Danger
    </Badge>





            
*/