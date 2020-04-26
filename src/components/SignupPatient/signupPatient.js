import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import './signupPatient.css';

export default class SignupPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            email:'',
            cpf: '',
            password:'',
            submitted: false,
            submitError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleCPFChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });

        return true;
    }

    handleCPFChange(e) {
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        console.log(event);        
        event.preventDefault();
    }
    render() {
        return (
            <div className="signup-patient">
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
                <form className="signup-patient__form" onSubmit={this.handleSubmit}>
                    <h3>Registro de Paciente</h3>
                    <div className="form-group">
                       <TextField fullWidth name="firstName" required label="Primeiro nome" variant="filled" type="text" onChange={this.handleChange} inputProps={{ maxLength: 20, style: { backgroundColor: 'white'} }}/>
                    </div>

                    <div className="form-group">
                        <TextField fullWidth name="lastName" required label="Último nome" variant="filled" onChange={this.handleChange} inputProps={{ maxLength: 40, style: { backgroundColor: 'white'}}} />
                    </div>

                    <div className="form-group">
                        <TextField fullWidth name="cpf" required label="CPF" type="number" variant="filled"  onChange={this.handleCPFChange} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14) }} min={0} inputProps={{ style: { backgroundColor: 'white'}}} />
                    </div>

                    <div className="form-group">
                        <TextField fullWidth name="email" onChange={this.handleChange} required label="Endereço de e-mail" type="email" variant="filled" inputProps={{ style: { backgroundColor: 'white'}}} />
                    </div>

                    <div className="form-group">
                        <TextField fullWidth name="password" onChange={this.handleChange} required id="filled-password-input" label="Senha"  type="password" autoComplete="current-password" variant="filled" inputProps={{ maxLength: 20, style: { backgroundColor: 'white'}}} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Inscrever-se</button>
                    <p className="forgot-password text-right">
                        Já registrado <a href="/login">sign in?</a>
                    </p>
                </form>
            </div>
        );
    }
}