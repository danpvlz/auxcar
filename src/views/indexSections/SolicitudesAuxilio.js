import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import {
    Button,
    Modal,
    Card
} from 'reactstrap'

function ModalResponse(props){
    return(
        <Modal
            className="modal-dialog-centered"
            isOpen={props.defaultModal}
            toggle={props.toggleModal}
        >
            <div className="modal-header">
            <h4 className="modal-title" id="modal-title-default">
                Solicitud de auxilio
            </h4>
            <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={props.toggleModal}
            >
                <span aria-hidden={true}>×</span>
            </button>
            </div>
            <div className="modal-body">
            <p className="mb-0">
                <strong>Fecha:</strong> {props.seleccionado.fecha}
            </p>
            <p className="mb-0">
                <strong>Hora:</strong> {props.seleccionado.hora}
            </p>
            <p className="mb-0">
                <strong>Cliente:</strong> {props.seleccionado.cliente}
            </p>
            <p className="mb-0">
                <strong>Teléfono:</strong> {props.seleccionado.contacto}
            </p>
            <p className="mb-3">
                <strong>Distrito:</strong> {props.seleccionado.distrito}
            </p>
            <iframe title="mapa" id="mapa" src={`https://maps.google.com/maps?q=${props.seleccionado.gpsLat},${props.seleccionado.gpsLong}&z=15&output=embed`} width="100%" height="300" style={{border:0+"px"}} aria-hidden="false"></iframe>
            <p className="description"><strong>Referencia: </strong>{props.seleccionado.referencia}</p>
            <div className="table-responsive-sm mt-3">
            <table className="table table-sm w-auto" >
                <thead>
                    <tr>
                        <th>Falla</th>
                        <th>Costo</th>
                        <th>Causa</th>
                    </tr>
                </thead>
                <tbody className="table-borderless  description mt-3">
                    {
                        JSON.parse(props.seleccionado.fallas_detalle).map((falla,i)=>{
                            return(
                                <tr key={i+"_tr_detalle"}>
                                    <td>{falla.falla}</td>
                                    <td>S/. {parseFloat(falla.costo)}</td>
                                    <td>{falla.causa}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <p className="mb-0 text-right">
                <strong>Reparación:</strong> S/. {props.seleccionado.reparacion}
            </p>
            <p className="mb-0 text-right">
                <strong>Asistencia:</strong> S/. {props.seleccionado.asistencia}
            </p>
            <p className="mb-0 text-right">
                <strong>Subtotal*:</strong> S/. {props.seleccionado.costo}
            </p>
        </div>
            </div>
            <div className="modal-footer">
            <div className="row">
            <div className="col">
            <Button className="float-left" onClick={()=>props.cambiarEstado(props.seleccionado.idAuxilio, 1)} block color="primary" type="button">
                Vehículo enviado
            </Button>
            <Button className="float-left"  onClick={()=>props.cambiarEstado(props.seleccionado.idAuxilio, 2)} block color="primary" type="button">
                Atención exitosa
            </Button>
            </div>
            <div className="col">
            <Button className="float-right" onClick={()=>props.cambiarEstado(props.seleccionado.idAuxilio, 3)} block color="danger" type="button">
                Cancelar pedido
            </Button>
            </div>
            </div>
            </div>
        </Modal>
    );
}

class SolicitudesAuxilio extends React.Component {
    constructor(){
        super();
        this.state={
            solicitudes: [],
            page: 0,
            rowsPerPage: 10,
            seleccionado: null,
            defaultModal: false,
            username: null
        };
    }
    componentDidMount(){
        this.authentication();
        this.loadData();
    }

    authentication = () => {
        let user_ls = localStorage.getItem("motriztante_auth_user");
        var user = "";
        var password = "";
        if(!user_ls){
            do{
                user = prompt("Usuario:");
                password = prompt("Contraseña:");
            }while(!user || !password);
            fetch(`http://localhost:4000/api/auth`,{
                method: 'POST',
                body: `{
                    "user": "${user}",
                    "pass": "${password}"
                }`,
                headers:{
                'Content-Type': 'application/json'
                }   
            }).then((response)=>{
                return response.json();
            }).then((JSON)=>{
                let usuario = JSON.data[0];
                if(usuario){
                    localStorage.setItem("motriztante_auth_user",usuario.nombre);
                    this.setState({username: usuario.nombre});
                }else{
                    this.props.history.push('/inicio');
                }
            });
        }else{
            this.setState({username: user_ls});
        }
    }

    loadData = () => {
        fetch(`http://localhost:4000/api/solicitudes-auxilio`, {method: 'POST'})
        .then((response)=>{
            return response.json();
        })
        .then((JSONresponse)=>{
            if(JSONresponse.status == 200){
                this.setState({solicitudes: JSONresponse.data});
            }
        })
        .catch((e)=>{console.log(e)});
    }

    handleChangePage = (event, newPage) => {
        console.log(newPage);
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: +event.target.value,page: 0});
    };

    handleClickRow = (e,n) => {
        let solicitud = this.state.solicitudes.slice().find(s=>s.idAuxilio==n);
        this.setState({seleccionado: solicitud}); 
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({
            defaultModal: !this.state.defaultModal
        });
    };

    cambiarEstado = (_id, estado) =>{
        fetch(`http://localhost:4000/api/solicitudes-auxilio/actualizar-estado/`,{
            method: 'POST',
            body: `{
                "_id": ${_id},
                "state": ${estado}
            }`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response=>{
            return response.json();
        })
        .then(JSONresponse=>{
            if(JSONresponse.status==200){
                console.log(JSONresponse.message);
                this.loadData();
                this.toggleModal();
            }
        })
        .catch(e=>{console.log(e)});
    }

//hover style={{"cursor": "pointer"}}
    render(){
        return(
            <>
            <div className="row py-3 align-items-center text-white">
          <div className="col">
            <h3 className="heading mb-0 text-white">Bienvenido, {this.state.username}</h3>
          </div>
          <div className="col">
              <Button className="float-right" size="sm" onClick={()=>{localStorage.removeItem("motriztante_auth_user"); this.props.history.push('/inicio');}}>Cerrar Sesión</Button>
          </div>
        </div>
            <Card>
              <TableContainer>
                <Table stickyHeader className="table-responsive text-nowrap">
                  <TableHead>
                    <TableRow>
                        <TableCell>
                        <strong> Fecha </strong>
                        </TableCell>
                        <TableCell>
                        <strong>Hora</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Cliente</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Teléfono</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Distrito</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Costo</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Estado</strong>
                        </TableCell>
                        <TableCell>
                        <strong>Detalle</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                        this.state.solicitudes.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((solicitud, i)=>{
                            return(
                                <TableRow  key={i+"_tr"} tabIndex={-1}>
                                    <TableCell>
                                        {solicitud.fecha}
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.hora}
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.cliente}
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.contacto}
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.distrito}
                                    </TableCell>
                                    <TableCell>
                                        S/. {solicitud.costo}
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.estado}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => this.handleClickRow(event, solicitud.idAuxilio)} fontSize="small" aria-label="detalles" color="primary" component="span">
                                            <Icon className="fa fa-plus-circle" fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>          
                            );
                        })
                    }
                </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                labelRowsPerPage="Mostrar:"
                count={this.state.solicitudes.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Card>
            {this.state.seleccionado ? 
            <ModalResponse cambiarEstado={this.cambiarEstado} defaultModal={this.state.defaultModal} seleccionado={this.state.seleccionado} toggleModal={this.toggleModal}/> : ""}
            </>
        );
    }

}



export default SolicitudesAuxilio;