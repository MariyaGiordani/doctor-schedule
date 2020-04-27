import React, { Component } from "react";
import 'react-dropdown/style.css';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import './signupPatient.css';
import PropTypes from 'prop-types';
import planilha from '../../assets/img/planilha.jpg'
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

export default class SignupPatient extends Component {
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
        const regex = /[A-Za-z]/;
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
            this.setState({ [name]: value, hasError: false});
        }
        
        return true;
    }

    handleClick() {
        this.setState({ hasError: false });
        if(!this.state.cpf.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)) {
            this.setState({ cpf: ''});
        } 

        if (this.state.specialty === null || this.state.firstName === "" || this.state.lastName === "" || this.state.cpf && this.state.crm === "" || this.state.email === "" || this.state.password === "") {
          this.setState({ hasError: true });
        }
    }

    handleSubmit(event) {
        //this.setState({ submitted: true });
        //this.setState({ submitError: true });
        console.log(event);        
        event.preventDefault();
    }

    render() {
        const { hasError} = this.state;
        return (
            <div className="signup-patient">
                {
                    this.state.submitted && 
                    <div className="signup-patient__form">
                        <Alert variant="filled" severity="success">
                            O registro foi salvo com sucesso!
                        </Alert>
                        <img className="signup-patient-img" alt="" src={planilha}/>
                        <p className="forgot-password text-right">
                           Gostaria de fazer <a href="/">sign in</a>
                        </p>
                    </div>
                }  
                {
                    this.state.submitError && 
                     <div className="signup-patient__form">
                        <Alert variant="filled" severity="error">
                           O registro não fou salvo!
                        </Alert>
                        <img className="signup-patient-img" alt="" src={planilha}/>
                        <p className="forgot-password text-right">
                            Volta para <a href="/signup-patient">pagina de cadastro</a>
                        </p>
                    </div>
                } 
                {!this.state.submitted && !this.state.submitError &&
                <form className="signup-patient__form" onSubmit={this.handleSubmit}>
                    <h3>Registro de Paciente</h3>
                    <FormControl fullWidth variant="outlined" error={hasError}>
                        <div className="form-group">
                            <TextField fullWidth name="firstName" error={this.state.firstName === "" && hasError ? true : false}  value={this.state.firstName} label="Primeiro nome*" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 20,}} />
                            {this.state.firstName === "" && hasError && <FormHelperText>Digita seu Primeiro nome!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="lastName" error={this.state.lastName === "" && hasError ? true : false}  value={this.state.lastName} label="Último nome*" variant="outlined" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                            {this.state.lastName === "" && hasError && <FormHelperText>Digita seu Último nome!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="cpf" error={this.state.cpf === "" && hasError ? true : false} label="CPF*" value={this.state.cpf} variant="outlined" onChange={this.handleChange}  InputProps={{ inputComponent: TextMaskCustom, value: this.state.cpf}}/>
                            {this.state.cpf === "" && hasError && <FormHelperText>Digita seu CPF!</FormHelperText>}
                        </div>
                      
                        <div className="form-group">
                            <TextField fullWidth name="email" error={this.state.email === "" && hasError ? true : false}  value={this.state.email} onChange={this.handleChange} label="Endereço de e-mail*" type="email" variant="outlined"/>
                            {this.state.email === "" && hasError && <FormHelperText>Digita seu email!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <TextField fullWidth name="password" error={this.state.password === "" && hasError ? true : false}  value={this.state.password} onChange={this.handleChange} id="filled-password-input" label="Senha*"  type="password" autoComplete="current-password" variant="outlined" inputProps={{ maxLength: 20,}} />
                            {this.state.password === "" && hasError && <FormHelperText>Digita senha!</FormHelperText>}
                        </div>
                    </FormControl>
                    <button type="submit" className="btn btn-primary btn-block" onClick={() => this.handleClick()}>Inscrever-se</button>
                    <p className="forgot-password text-right">
                        Já registrado <a href="/">sign in?</a>
                    </p>
                </form>}
            </div>
        );
    }
}