import React, { Component } from "react";
import './schedule.css'
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import MaskedInput from 'react-text-mask';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import daysOfWeek from '../../utils/daysOfWeeek';
import FormHelperText from "@material-ui/core/FormHelperText";
import planilha from '../../assets/img/planilha.jpg';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(0),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
}))(InputBase);


export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
           cep: null,
           healthCare:'',
           information: '',
           telephone: null,
           city: '',
           neighborhood: '',
           address: '',
           number: null,
           aditionalInf: '',
           startLunchHour: null,
           endLunchHour: null,
           startWorkHour: null,
           endWorkHour: null,
           consultationTime: '',
           cancelMedicalConsultation: '',
           daysOfWeek: [],
           hasError: false,
           message: '',
           submitted: false,
           submitError: false,
           alert: false,
           addressLength: null
        };
    }

    handleChange = async(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(value.length > 7 && name === "cep") {
            let results = await axios.get(`http://viacep.com.br/ws/` + value + `/json/`).then((response) => {return response.data});
            console.log(results)
            if(results) {
               this.setState({city: results.localidade, address: results.logradouro, neighborhood: results.bairro, aditionalInf: results.complemento})
            }
        }
        this.setState({ [name]: value, hasError: false});
        
        return true;
    }

    getAddresses = () => {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses/GetAddresses`;
        axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}}).then(response => {
            this.setState({addressLength: response.data.length});
        });
    }

    handleSubmit = (event) => {
        console.log(this.state.daysOfWeek.length)
        this.setState({ hasError: false });
        let requiredFields = ["cep", "healthCare", "telephone", "city", "neighborhood", "address", "number", "startLunchHour", "endLunchHour", "startWorkHour", "endWorkHour", "consultationTime", "cancelMedicalConsultation", "daysOfWeek"];
        let missing = requiredFields.filter(f => { return this.state[f] === undefined || this.state[f] === null || this.state[f] === ''; } );
        console.log("Missing", missing);
        event.preventDefault();
        let data = {
            RoadType: "",
            Street: this.state.address,
            Number: this.state.number,
            Neighborhood: this.state.neighborhood,
            Complement: this.state.aditionalInf,
            PostalCode: this.state.cep,
            City: this.state.city,
            UF: "",
            Information: this.state.information,
            Cpf: sessionStorage.getItem('code'),
            AddressAction: 1,
            TimeSheet: {
                StartDate: this.state.startWorkHour,
                EndDate: this.state.endWorkHour,
                LunchStartDate: this.state.startLunchHour,
                LunchEndDate: this.state.endLunchHour,
                AppointmentDuration: this.state.consultationTime,
                Cpf: sessionStorage.getItem('code'),
                AppointmentCancelTime: this.state.cancelMedicalConsultation,
                DaysOfTheWeeks: this.state.daysOfWeek
            },
            Telephone: this.state.telephone,
            HealthCare: this.state.healthCare
        }

        const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses`;
        if (missing.length > 0) {
            this.setState({ hasError: true });
        }else if(this.state.addressLength < 2) {
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
                    console.log(response);
                    this.setState({ message: response.data.mensagem, submitted: true });
                }).catch(error => {
                    console.log(error);
                    this.setState({ message: error.response.data.mensagem, submitError: true });
            });
        } else {
            let mensagem = "Não é possivel cadastrar outro endereço porque tem cadastrados dois!"
            this.setState({ message: mensagem, alert: true });
        }
    }

    render() {
        const { hasError} = this.state;
        const consultationTime = ['15 min', '30 min', '1h'];
        const cancelMedicalConsultation = ['24h', '48h'];
        this.getAddresses();
        return (
            <div className="schedule">
                {
                    this.state.submitted && 
                    <div className="schedule__form">
                        <Alert variant="filled" severity="success">
                           {this.state.message}
                        </Alert>
                    </div>
                }  
                {
                    (this.state.submitError || this.state.alert) &&
                     <div className="schedule__form">
                        <Alert variant="filled" severity="error">
                            {this.state.message}
                        </Alert>
                        { !this.state.alert &&
                            <div> 
                                <img className="signup-patient-img" alt="" src={planilha}/>
                                <p className="forgot-password text-right">
                                    Volta para <a href="/schedule-doctor">pagina de cadastro de endereço</a>
                                </p>
                            </div>
                        }
                    </div>
                }
                {!this.state.submitted && !this.state.submitError &&
                    <form className="schedule__form" onSubmit={this.handleSubmit}>
                        <div className="schedule--flex schedule--margin">
                            <div className="form-group" style={{marginRight: "10px"}}>
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">CEP</InputLabel>
                                <MaskedInput className="schedule__input" name="cep" value={this.state.cep} onChange={this.handleChange} mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}/>
                                {this.state.cep === null && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita seu CEP!</FormHelperText>}
                            </div>
                            <div className="form-group">
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Telefone</InputLabel>
                                <MaskedInput className="schedule__input" name="telephone" value={this.state.telephone} onChange={this.handleChange} mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}/>
                                {this.state.telephone === null && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita seu Telefone!</FormHelperText>}
                            </div>
                        </div>
                        <div className="schedule--flex">
                            <div className="form-group" style={{marginRight: "10px"}}>
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Cidade</InputLabel>
                                <BootstrapInput id="bootstrap-input" name="city" value={this.state.city} type="text" onChange={this.handleChange}/>
                                {this.state.city === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita Cidade!</FormHelperText>}
                            </div>
                            <div className="form-group">
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Bairro</InputLabel>
                                <BootstrapInput id="bootstrap-input" name="neighborhood" value={this.state.neighborhood} type="text" onChange={this.handleChange}/>
                                {this.state.neighborhood === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita o bairro!</FormHelperText>}
                            </div>
                        </div>
                        <div className="schedule--flex">
                            <div className="form-group" style={{marginRight: "10px"}}>
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Endereço</InputLabel>
                                <BootstrapInput  id="bootstrap-input" name="address" value={this.state.address} type="text" onChange={this.handleChange}/>
                                {this.state.address === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita edereço!</FormHelperText>}
                            </div>
                            <div className="form-group" style={{marginRight: "10px", width: "10%"}}>
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Número</InputLabel>
                                <BootstrapInput style={{width: "90%"}} id="bootstrap-input" name="number" value={this.state.number} type="number" onChange={this.handleChange}/>
                                {this.state.number === null && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita número!</FormHelperText>}
                            </div>
                            <div className="form-group">
                                <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Complemento</InputLabel>
                                <BootstrapInput id="bootstrap-input" name="aditionalInf" value={this.state.aditionalInf} type="text" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="schedule--flex">
                            <div className="form-group" style={{marginRight: "40px"}}>
                                <InputLabel style={{color: "black", fontWeight: "600", textAlign:"center"}} htmlFor="bootstrap-input">Horário de atendimento</InputLabel>
                                <div className="schedule--flex">
                                    <DatePicker
                                        selected={this.state.startWorkHour}
                                        onChange={event => (this.setState({startWorkHour: event}))}
                                        className="schedule__input"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecione horário"
                                    />
                                    <h5 style={{padding:"10px"}}>as</h5>
                                    <DatePicker
                                        selected={this.state.endWorkHour}
                                        onChange={event => (this.setState({endWorkHour: event}))}
                                        className="schedule__input"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecione horário"
                                    />
                                </div>
                                {this.state.endWorkHour === null && this.state.startWorkHour === null && hasError && <FormHelperText style={{padding: "0", color: "red", textAlign:"center"}}>Escolha horário de trabalho!</FormHelperText>}
                            </div>
                            <div className="form-group">
                                <InputLabel style={{color: "black", fontWeight: "600", textAlign:"center"}} htmlFor="bootstrap-input">Horário de almoço</InputLabel>
                                <div className="schedule--flex">
                                    <DatePicker
                                        selected={this.state.startLunchHour}
                                        onChange={event => (this.setState({startLunchHour: event}))}
                                        className="schedule__input"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecione horário"
                                    />
                                    <h5 style={{padding:"10px"}}>as</h5>
                                    <DatePicker
                                        selected={this.state.endLunchHour}
                                        onChange={event => (this.setState({endLunchHour: event}))}
                                        className="schedule__input"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecione horário"
                                    />
                                </div>
                                {this.state.startLunchHour === null && this.state.endLunchHour === null && hasError && <FormHelperText style={{padding: "0", color: "red", textAlign:"center"}}>Escolha horário de almoço!</FormHelperText>}
                            </div>
                            <div style={{flexDirection: "column", marginLeft:"50px"}}>
                                <InputLabel style={{color: "black", fontWeight: "600", textAlign:"center"}} htmlFor="bootstrap-input">Dias da semana</InputLabel>
                                <div style={{display: "flex"}}>
                                    {daysOfWeek.daysOfWeek.map((option) => (
                                        <div style={{flexDirection: "column"}}>
                                            <h5 style={{textAlign: "center", margin: "auto"}}>{option.label}</h5>
                                            <Checkbox color="primary" onChange={event => (this.setState(prevState => ({daysOfWeek: [...prevState.daysOfWeek, ({ Id: 0, Name: option.Name })]})))}/>
                                        </div>
                                    ))}
                                </div>
                                {this.state.daysOfWeek.length === 0 && hasError && <FormHelperText style={{padding: "0", color: "red", textAlign:"center"}}>Escolha dias de semana!</FormHelperText>}
                            </div>
                        </div>
                        <div className="schedule--flex">
                            <div className="schedule--flex">
                                <InputLabel style={{color: "black", fontWeight: "600", padding:"15px", width: "50%"}} htmlFor="bootstrap-input">Tempo máximo para cancelar consulta</InputLabel>
                                <div>
                                    <Dropdown options={cancelMedicalConsultation} onChange={event => (this.setState({cancelMedicalConsultation: event.label}))} value={this.state.cancelMedicalConsultation} placeholder="Selecione" />
                                    {this.state.cancelMedicalConsultation === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Escolha cancelamento!</FormHelperText>} 
                                </div>
                            </div>
                            <div className="schedule--flex">
                                <InputLabel style={{color: "black", fontWeight: "600", padding:"15px", width: "50%"}} htmlFor="bootstrap-input">Tempo para cada consulta</InputLabel>
                                <div>
                                <Dropdown options={consultationTime} onChange={event => (this.setState({consultationTime: event.label}))} value={this.state.consultationTime} placeholder="Selecione" />
                                {this.state.consultationTime === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Escolha duração da consulta!</FormHelperText>}
                                </div>
                            </div>
                        </div>
                        <InputLabel style={{color: "black", fontWeight: "600", marginTop: "20px"}} htmlFor="bootstrap-input">Planos de Saúde aceitos</InputLabel>
                        <TextareaAutosize
                            className="information"
                            style={{borderRadius: "5px", height: "80px"}}
                            rowsMax={6}
                            name="healthCare"
                            aria-label="maximum height width"
                            placeholder=""
                            value={this.state.healthCare}
                            onChange={this.handleChange}
                        />
                        {this.state.healthCare === "" && hasError && <FormHelperText style={{padding: "0", color: "red"}}>Digita as planos de saude!</FormHelperText>}
                        <InputLabel style={{color: "black", fontWeight: "600", marginTop: "20px"}} htmlFor="bootstrap-input">Observações adicionais</InputLabel>
                        <TextareaAutosize
                            className="information"
                            style={{borderRadius: "5px", height: "80px", marginBottom: "10px"}}
                            rowsMax={6}
                            name="information"
                            aria-label="maximum height width"
                            placeholder=""
                            value={this.state.information}
                            onChange={this.handleChange}
                        />
                        <div className="schedule--flex schedule--margin">
                            {this.state.addressLength < 1 && <button type="submit" style={{marginRight: "10px"}} className="btn btn-primary" onSubmit={this.handleSubmit}>Criar Agenda</button>}
                            {this.state.addressLength === 1 && <button type="submit" className="btn btn-primary">Adicionar novo endereço</button>}
                        </div>
                    </form>
                }
            </div>
        );
    }
  
}