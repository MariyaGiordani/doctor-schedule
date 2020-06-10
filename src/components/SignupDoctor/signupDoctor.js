import React, { Component } from "react";
import 'react-dropdown/style.css';
import MaskedInput from 'react-text-mask';
import options from '../../utils/specialtyDoctor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import InputLabel from "@material-ui/core/InputLabel";
import './signupDoctor.css';
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import planilha from '../../assets/img/planilha.jpg';
import axios from 'axios';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default class SignupDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            email:'',
            crm: null,
            cpf:'',
            message:'',
            specialty: null,
            password:'',
            submitted: false,
            submitError: false,
            hasError:false,
            errorSpecialty: false
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
            this.setState({ errorSpecialty: false });
            this.setState({ [name]: value, hasError: false});
        }else {
            if(name === "specialty") {
                this.setState({ errorSpecialty: false });
            }
            this.setState({ [name]: value, hasError: false});
        }
        
        return true;
    }

    handleSubmit(event) {
        this.setState({ hasError: false });
        if(this.state.specialty === null) {
            this.setState({ errorSpecialty: true });
        }

        if(!this.state.cpf.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)) {
            this.setState({ cpf: ''});
        }

        let requiredFields = ["firstName", "lastName", "cpf", "email", "password", "crm", "specialty"];
        let missing = requiredFields.filter(f => { return this.state[f] === undefined || this.state[f] === null || this.state[f] === ''; } );
        console.log("Missing", missing);

        let data = {
            UserName: this.state.email,
            Password: this.state.password,
            Doctor: {
              Cpf: this.state.cpf,
              FirstName: this.state.firstName,
              LastName: this.state.lastName,
              Crm: this.state.crm,
              Speciality: this.state.specialty
            },
        }
        event.preventDefault();
        console.log(data); 
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Users`;
 
        if (missing.length > 0) {
            this.setState({ hasError: true });
        }else {
            axios(URL, {
                method: 'POST',
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
                    if(response.data.sucesso) {
                        this.setState({ message: response.data.mensagem, submitted: true });
                    }else {
                        this.setState({ message: response.data.mensagem, submitError: true });
                    }
                }).catch(error => {
                    this.setState({ message: error.data.mensagem, submitError: true });
            });
        }
    }

    render() {
        const { hasError} = this.state;
        return (
            <div className="signup-doctor">
                {
                    this.state.submitted && 
                    <div className="signup-doctor__form">
                        <Alert variant="filled" severity="success">
                            {this.state.message}
                        </Alert>
                        <img className="signup-doctor-img" alt="" src={planilha}/>
                        <p className="forgot-password text-right">
                           Faça seu <a href="/">login</a>
                        </p>
                    </div>
                }  
                {
                    this.state.submitError && 
                    <div className="signup-doctor__form">
                        <Alert variant="filled" severity="error">
                           {this.state.message}
                        </Alert>
                        <img className="signup-doctor-img" alt=""/>
                        <p className="forgot-password text-right">
                           Voltar para <a href="/signup-doctor">página de cadastro</a>
                        </p>
                    </div>
                } 
                {!this.state.submitted && !this.state.submitError &&
                <form className="signup-doctor__form" onSubmit={this.handleSubmit}>
                    <h3>Registro do Parceiro</h3>
                    <FormControl fullWidth variant="outlined" error={hasError}>
                        <div className="form-group form-size">
                            <TextField fullWidth name="firstName" error={this.state.firstName === "" && hasError ? true : false}  value={this.state.firstName} label="Primeiro nome *" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 20,}} />
                            {this.state.firstName === "" && hasError && <FormHelperText>Digite seu Primeiro nome!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <TextField fullWidth name="lastName" error={this.state.lastName === "" && hasError ? true : false}  value={this.state.lastName} label="Último nome *" variant="outlined" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                            {this.state.lastName === "" && hasError && <FormHelperText>Digite seu Último nome!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <TextField fullWidth name="crm" label="CRM *" error={this.state.crm === null && hasError ? true : false} value={this.state.crm} type="number" variant="outlined" onChange={this.handleChange} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10) }} min={0}/>
                            {this.state.crm === null && hasError && <FormHelperText>Digite seu CRM!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <TextField fullWidth name="cpf" error={this.state.cpf === "" && hasError ? true : false} label="CPF *" value={this.state.cpf} variant="outlined"  onChange={this.handleChange}  InputProps={{ inputComponent: TextMaskCustom, value: this.state.cpf}}/>
                            {this.state.cpf === "" && hasError && <FormHelperText>Digite seu CPF!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <InputLabel className="signup-doctor--position" error={this.state.errorSpecialty}>Especialidade *</InputLabel>
                            <Select
                                fullWidth
                                error={this.state.errorSpecialty}
                                name="specialty"
                                onChange={this.handleChange}
                                label="Especialidade *"
                            >
                                {options.specialtyDoctor.map((option) => (
                                    <MenuItem key={option.value} value={option.label} >
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {this.state.specialty === null && hasError && <FormHelperText>Escolha uma das Especialidades!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <TextField fullWidth name="email" error={this.state.email === "" && hasError ? true : false}  value={this.state.email} onChange={this.handleChange} label="Endereço de e-mail *" type="email" variant="outlined" />
                            {this.state.email === "" && hasError && <FormHelperText>Digite seu e-mail!</FormHelperText>}
                        </div>

                        <div className="form-group form-size">
                            <TextField fullWidth name="password" error={this.state.password === "" && hasError ? true : false}  value={this.state.password} onChange={this.handleChange} id="filled-password-input" label="Senha *"  type="password" autoComplete="current-password" variant="outlined" inputProps={{ maxLength: 20,}} />
                            {this.state.password === "" && hasError && <FormHelperText>Digite uma senha!</FormHelperText>}
                        </div>
                    </FormControl>
                    <button type="submit" className="btn btn-primary btn-block btn-margin">Inscrever-se</button>
                    <p className="forgot-password text-right text_family">
                        Já registrado? <a href="/">Entrar</a>
                    </p>
                </form>}
            </div>
        );
    }
}