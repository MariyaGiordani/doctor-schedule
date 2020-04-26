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
            crm: '',
            cpf:'',
            specialty: null,
            password:'',
            submitted: false,
            submitError: false,
            hasError:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name === "cpf") {
            const validarCpf = require('validar-cpf');
            validarCpf(value);
        } else {
            this.setState({ [name]: value, hasError: false});
            
        }

        return true;
    }

    handleClick() {
        this.setState({ hasError: false });
        if (this.state.specialty === null || this.state.firstName === "" || this.state.lastName === "" || this.state.cpf && this.state.crm === "" || this.state.email === "" || this.state.password === "") {
          this.setState({ hasError: true });
        }
    }

    handleSubmit(event) {
        //this.setState({ submitted: true });
        console.log(event);        
        event.preventDefault();
    }

    render() {
        const { hasError} = this.state;
        return (
            <div className="signup-doctor">
                {
                    this.state.submitted && 
                    <Alert variant="filled" severity="success">
                        O registro foi salvo com sucesso!
                    </Alert>
                }  
                {
                    this.state.submitError && 
                    <Alert variant="filled" severity="error">
                       O registro não fou salvo!
                    </Alert>
                } 
                {!this.state.submitted && !this.state.submitError &&
                <form className="signup-doctor__form" onSubmit={this.handleSubmit}>
                    <h3>Registro de Doutor</h3>
                    <FormControl fullWidth variant="outlined" error={hasError}>
                        <div className="form-group">
                            <TextField fullWidth name="firstName" label="Primeiro nome" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 20, pattern: "[a-z]"}} />
                            {this.state.firstName === "" && hasError && <FormHelperText>Digita seu Primeiro nome!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="lastName" label="Último nome" variant="outlined" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                            {this.state.lastName === "" && hasError && <FormHelperText>Digita seu Último nome!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="crm" label="CRM" type="tel" variant="outlined"  onChange={this.handleChange} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10) }} min={0}/>
                            {this.state.crm === "" && hasError && <FormHelperText>Digita seu CRM!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="cpf" label="CPF"  variant="outlined" onChange={this.handleChange}  InputProps={{ inputComponent: TextMaskCustom,}}/>
                            {this.state.cpf === "" && hasError && <FormHelperText>Digita seu CPF!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <InputLabel className="signup-doctor--position">Especialidade</InputLabel>
                            <Select
                                fullWidth
                                name="specialty"
                                onChange={this.handleChange}
                                label="Especialidade"
                            >
                                {options.specialtyDoctor.map((option) => (
                                    <MenuItem key={option.value} value={option.label}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {this.state.specialty === null && hasError && <FormHelperText>Escolhe um dos Especialidade!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="email" onChange={this.handleChange} label="Endereço de e-mail" type="email" variant="outlined"/>
                            {this.state.email === "" && hasError && <FormHelperText>Digita seu email!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="password" onChange={this.handleChange} id="filled-password-input" label="Senha"  type="password" autoComplete="current-password" variant="outlined" inputProps={{ maxLength: 20,}} />
                            {this.state.password === "" && hasError && <FormHelperText>Digita senha!</FormHelperText>}
                        </div>
                    </FormControl>
                    <button type="submit" className="btn btn-primary btn-block" onClick={() => this.handleClick()}>Inscrever-se</button>
                    <p className="forgot-password text-right">
                        Já registrado <a href="/login">sign in?</a>
                    </p>
                </form>}
            </div>
        );
    }
}