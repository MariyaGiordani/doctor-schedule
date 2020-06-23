import React, { Component } from "react";
import 'react-dropdown/style.css';
import options from '../../utils/specialtyDoctor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import './SearchPage.css';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { Redirect } from 'react-router';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            neighborhood: '',
            specialty: null,
            hasError:false,
            message: '',
            submitError: false,
            doctors: false,
            listDoctors: [],
            resultDoctor: false,
            doctor: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const regex = /^[a-zA-Z\s]+$/;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const chars = event.target.value.split('');
        const char = chars.pop();
        if(name === "firstName" || name === "lastName") {
            if (!regex.test(char)) {
                event.target.value = chars.join('');
                console.log(`${char} is not a valid character.`);
                return false;
            }
            this.setState({ [name]: value, hasError: false});
        }else {
            if(name === "specialty") {
                this.setState({ errorSpecialty: false });
            }
            this.setState({ [name]: value, hasError: false});
        }
        
        return true;
    }

    handleClick() {
        this.setState({ hasError: false });

        if (this.state.specialty === null || this.state.name === "" ) {
          this.setState({ hasError: true });
        }
    }

    handleSubmit(event) {
        this.setState({ submitError: false });
        event.preventDefault(); 
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Doctors/search`;
        axios.get(URL, {
            params: {
                firstName: this.state.firstName,
                lastname: this.state.lastName,
                neighborhood: this.state.neighborhood,
                specialty: this.state.specialty
            }
          })
          .then(response => {
                console.log(response);
                if(response.data.length > 0){
                    console.log(response.data);
                    this.setState({ listDoctors: response.data, doctors: true });
                }//else {
                    //this.setState({ resultDoctor: true, doctor: response.data[0]});
                //}
            }).catch(error => {
                console.log(error);
                this.setState({ message: error.response.data.mensagem, submitError: true });
        });
    }

    render() {
        const {doctor} = this.state;
        return (
            <div className="search-page">
                <form className="search-page__form" onSubmit={this.handleSubmit}>
                    {
                        this.state.submitError && 
                        <Alert variant="filled" severity="error">
                            {this.state.message}
                        </Alert>
                    } 
                    {
                        this.state.doctors && 
                        <div>
                            <TableContainer  component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead style={{backgroundColor: "#3f51b5"}}>
                                        <TableRow>
                                            <TableCell style={{color:"white"}}>Ação</TableCell>
                                            <TableCell style={{color:"white"}} align="left">Nome</TableCell>
                                            <TableCell style={{color:"white"}} align="left">Especialidade</TableCell>
                                            <TableCell style={{color:"white"}} align="left">Endereço 1</TableCell>
                                            <TableCell style={{color:"white"}} align="left">Endereço 2</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.listDoctors.map((item) =>  (
                                        <TableRow key={item.$id}>
                                            <TableCell component="th" scope="row">
                                                {console.log("Doctor", item.$id, item, item.Addresses.length)}
                                                <Avatar onClick={event => (this.setState({resultDoctor: true, doctor: item}))} style={{backgroundColor:"#3f51b5"}}>
                                                    <PageviewIcon />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell align="left">{item.FirstName + ' ' + item.LastName}</TableCell>
                                            <TableCell align="left">{item.Speciality}</TableCell>
                                            {console.log(item.Addresses)}
                                            {item.Addresses.map((item) =>  (
                                                item.Status!== 2 && <TableCell key={item.$id} align="left">{item.Street} , {item.Number}</TableCell>
                                            ))}
                                            {item.Addresses.length <= 1 && <TableCell align="left">Não cadastrado</TableCell>}
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                    {
                        !this.state.doctors &&
                        <div class="search-padding">
                            <h3>Pesquisar Médico</h3>
                            <FormControl fullWidth variant="outlined">
                                <div className="form-group form-size">
                                    <TextField fullWidth name="firstName"  value={this.state.firstName} label="Primeiro nome do Médico" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                                </div>
                                <div className="form-group form-size">
                                    <TextField fullWidth name="lastName" value={this.state.lastName} label="Sobrenome do Médico" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                                </div>
                                <div className="form-group form-size">
                                    <TextField fullWidth name="neighborhood"  value={this.state.neighborhood} label="Procurar por Bairro" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                                </div>
                                <div className="form-group form-size">
                                    <InputLabel className="signup-doctor--position">Especialidade</InputLabel>
                                    <Select
                                        fullWidth
                                        name="specialty"
                                        onChange={this.handleChange}
                                        label="Especialidade*"
                                    >
                                        {options.specialtyDoctor.map((option) => (
                                            <MenuItem key={option.value} value={option.label}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </FormControl>
                            <button type="submit" className="btn btn-primary btn-margin" onClick={() => this.handleClick()}>Pesquisar</button>
                        </div>
                    }
                </form>
                {this.state.resultDoctor && (
                    <Redirect to={{ pathname: '/result-doctor', state: {doctor}}} />
                )}
            </div>
        );
    }
}