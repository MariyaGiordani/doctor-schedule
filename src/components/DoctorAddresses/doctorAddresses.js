import React, { Component } from "react";
import 'react-dropdown/style.css';
import './doctorAddresses.css';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import EditIcon from '@material-ui/icons/Edit';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Schedule from '../../components/Schedule/schedule';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

export default class DoctorAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: props.addresses,
            edit: false,
            editAddress: [],
            data: [],
            cancel: false
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal, edit: false});
        window.location.reload();
    };

    handleClick = (e, item) => {
        console.log(item);
        let data = {
            AddressId: item.addressId,
            RoadType: item.roadType,
            Street: item.street,
            Number: item.number,
            Neighborhood: item.neighborhood,
            Complement: item.complement,
            PostalCode: item.postalCode,
            City: item.city,
            UF: item.uf,
            Information: item.information,
            Cpf: item.cpf,
            TimeSheet: item.timeSheet,
            Telephone: item.telephone,
            HealthCare: item.healthCare,
            DaysOfTheWeeks: null,
            Status: 2
          }
        this.setState({data: data, modal: !this.state.modal, cancel: true});
    }

    handleDelete = () => {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses/`;
        axios(URL + sessionStorage.getItem('code'), {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'content-type': 'application/json;',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Accept': '/'
            },
            data: this.state.data,
        })
            .then(response => { 
                this.setState({edit: false, cancel: false, message: "Endereço cancelado com successo!"})
                console.log(response);
            }).catch(error => {
                console.log(error);
        });
    }

    handleEdit = (e, item) => {
        this.setState({edit: true, editAddress: item});
    }

    render() {
        console.log(this.state.addresses)
        return (
            <div>
                { !this.state.edit &&
                    <div className="doctor-addresses">
                        <TableContainer  component={Paper}>
                            <Table aria-label="customized table">
                                {this.state.addresses.length === 0 &&<caption><div className="doctor-addresses-message">Você ainda não tem nenhum endereço cadastrado.</div></caption>}
                                {this.state.addresses.length < 2 && <caption style={{ padding: "0", marginTop: "4em"}}><hr/></caption>}
                                {this.state.addresses.length < 2 &&
                                    <caption style={{ padding: "0"}}>  
                                        <div className="doctor-addresses-new">
                                            <Avatar onClick={e => this.setState({edit: true})} style={{backgroundColor:"#3f51b5"}}>
                                                <AddCircleIcon />
                                            </Avatar>
                                            <div className="doctor-addresses-title">Adicionar Endereço</div>
                                        </div>
                                    </caption>
                                }
                                <TableHead style={{backgroundColor: "#3f51b5"}}>
                                    <TableRow>
                                        <TableCell style={{color:"white"}} align="left">Editar</TableCell>
                                        <TableCell style={{color:"white"}} align="left">Deletar</TableCell>
                                        <TableCell style={{color:"white"}} align="left">CEP</TableCell>
                                        <TableCell style={{color:"white"}} align="left">Endereço</TableCell>
                                        <TableCell style={{color:"white"}} align="left">Cidade</TableCell>
                                        <TableCell style={{color:"white"}} align="left">Telephone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.addresses.length > 0 &&  this.state.addresses.map((item) =>  (
                                    <TableRow key={item.$id}>
                                        <TableCell component="th" scope="row">
                                            <Avatar onClick={e => this.handleEdit(e, item)} style={{backgroundColor:"#3f51b5"}}>
                                                <EditIcon />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Avatar onClick={e => this.handleClick(e, item)} style={{backgroundColor:"red"}}>
                                                <DeleteForeverIcon />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="left">{item.postalCode}</TableCell>
                                        <TableCell align="left">{item.street + ' ' + item.number}</TableCell>
                                        <TableCell align="left">{item.city}</TableCell>
                                        <TableCell align="left">{item.telephone}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            <Modal
                                isOpen={this.state.modal}
                                toggle={this.toggle}
                                size="sm"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <ModalHeader style={{backgroundColor: "#007bff", color:"white"}} toggle={this.toggle}>
                                </ModalHeader>
                                <ModalBody> 
                                    { this.state.cancel && <div>Confirma clicando no botão que você realmente gostaria de deletar esse endereço!</div> }
                                    { !this.state.cancel  && <div>{this.state.message}</div> }
                                </ModalBody>
                                <ModalFooter>
                                    { this.state.cancel && <Button color="primary" onClick={this.handleDelete}>Confirmar</Button> }
                                </ModalFooter>
                        </Modal>
                        </TableContainer>
                    </div>
                }
            { this.state.edit && <Schedule editAddress={this.state.editAddress} addresses={this.state.addresses} />}
            </div>
        );
    }
}