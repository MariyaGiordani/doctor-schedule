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
           information:'',
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
           cancelMedicalonsultation: '',
           daysOfWeek: []
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

    handleSubmit = (event) => {
        event.preventDefault();
       console.log(this.state);
    }

    render() {
        const consultationTime = ['15 min', '30 min', '1h'];
        const cancelMedicalonsultation = ['24h', '48h'];
        return (
            <div className="schedule">
                <form className="schedule__form" onSubmit={this.handleSubmit}>
                    <div className="schedule--flex schedule--margin">
                        <div className="form-group" style={{marginRight: "10px"}}>
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">CEP</InputLabel>
                            <MaskedInput className="schedule__input" name="cep" value={this.state.cep} onChange={this.handleChange} mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}/>
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Telefone</InputLabel>
                            <MaskedInput className="schedule__input" name="telephone" value={this.state.telephone} onChange={this.handleChange} mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}/>
                        </div>
                    </div>
                    <div className="schedule--flex">
                        <div className="form-group" style={{marginRight: "10px"}}>
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Cidade</InputLabel>
                            <BootstrapInput id="bootstrap-input" name="city" value={this.state.city} type="text" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Bairro</InputLabel>
                            <BootstrapInput id="bootstrap-input" name="neighborhood" value={this.state.neighborhood} type="text" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="schedule--flex">
                        <div className="form-group" style={{marginRight: "10px"}}>
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Endereço</InputLabel>
                            <BootstrapInput  id="bootstrap-input" name="address" value={this.state.address} type="text" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group" style={{marginRight: "10px", width: "10%"}}>
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Número</InputLabel>
                            <BootstrapInput style={{width: "90%"}} id="bootstrap-input" name="number" value={this.state.number} type="number" onChange={this.handleChange}/>
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
                        </div>
                        <div style={{flexDirection: "column", marginLeft:"50px"}}>
                            <InputLabel style={{color: "black", fontWeight: "600", textAlign:"center"}} htmlFor="bootstrap-input">Dias da semana</InputLabel>
                            <div style={{display: "flex"}}>
                                {daysOfWeek.daysOfWeek.map((option) => (
                                    <div style={{flexDirection: "column"}}>
                                        <h5 style={{textAlign: "center", margin: "auto"}}>{option.label}</h5>
                                        <Checkbox color="primary" onChange={event => (this.setState(prevState => ({daysOfWeek: [...prevState.daysOfWeek, option.name]})))}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="schedule--flex">
                        <div className="schedule--flex">
                                <InputLabel style={{color: "black", fontWeight: "600", padding:"15px", width: "50%"}} htmlFor="bootstrap-input">Tempo máximo para cancelar consulta</InputLabel>
                                <Dropdown options={cancelMedicalonsultation} onChange={event => (this.setState({cancelMedicalonsultation: event.label}))} value={this.state.cancelMedicalonsultation} placeholder="Selecione" />
                        </div>
                        <div className="schedule--flex">
                                <InputLabel style={{color: "black", fontWeight: "600", padding:"15px", width: "50%"}} htmlFor="bootstrap-input">Tempo para cada consulta</InputLabel>
                                <Dropdown options={consultationTime} onChange={event => (this.setState({consultationTime: event.label}))} value={this.state.consultationTime} placeholder="Selecione" />
                        </div>
                    </div>
                    <InputLabel style={{color: "black", fontWeight: "600", marginTop: "20px"}} htmlFor="bootstrap-input">Planos de Saúde aceitos</InputLabel>
                    <TextareaAutosize
                        className="information"
                        style={{borderRadius: "5px", height: "80px"}}
                        rowsMax={6}
                        aria-label="maximum height width"
                        placeholder=""
                        value={this.state.information}
                        onChange={this.handleChange}
                    />
                    <InputLabel style={{color: "black", fontWeight: "600", marginTop: "20px"}} htmlFor="bootstrap-input">Observações adicionais</InputLabel>
                    <TextareaAutosize
                        className="information"
                        style={{borderRadius: "5px", height: "80px", marginBottom: "10px"}}
                        rowsMax={6}
                        aria-label="maximum height width"
                        placeholder=""
                        value={this.state.information}
                        onChange={this.handleChange}
                    />
                    <div className="schedule--flex schedule--margin">
                        <button type="submit" style={{marginRight: "10px"}} className="btn btn-primary" onSubmit={this.handleSubmit}>Criar Agenda</button>
                        <button type="submit" className="btn btn-primary">Adicionar novo endereço</button>
                    </div>
                </form>
            </div>
        );
    }
  
}