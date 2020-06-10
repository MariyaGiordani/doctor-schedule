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
import axios from 'axios';

export default class DoctorAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: props.addresses,
            edit: false,
            editAddress: []
        };
    }

    handleDelete = (e, item) => {
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
            data: data,
        })
            .then(response => { 
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
            { this.state.addresses.length === 2 && !this.state.edit && 
                <div className="doctor-addresses">
                    <TableContainer  component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead style={{backgroundColor: "#3f51b5"}}>
                                <TableRow>
                                    <TableCell style={{color:"white"}} align="center">Ação</TableCell>
                                    <TableCell style={{color:"white"}} align="left">CEP</TableCell>
                                    <TableCell style={{color:"white"}} align="left">Endereço</TableCell>
                                    <TableCell style={{color:"white"}} align="left">Cidade</TableCell>
                                    <TableCell style={{color:"white"}} align="left">Telephone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.addresses.map((item) =>  (
                                <TableRow key={item.$id}>
                                    <TableCell component="th" scope="row" style={{ display: "flex", justifyContent: "space-evenly"}}>
                                        <Avatar onClick={e => this.handleEdit(e, item)} style={{backgroundColor:"#3f51b5"}}>
                                            <EditIcon />
                                        </Avatar>
                                        <Avatar onClick={e => this.handleDelete(e, item)} style={{backgroundColor:"red"}}>
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
                    </TableContainer>
                </div>
            }
            { (this.state.edit || this.state.addresses.length < 2) && <Schedule editAddress={this.state.editAddress} addresses={this.state.addresses} />}
            </div>
        );
    }
}