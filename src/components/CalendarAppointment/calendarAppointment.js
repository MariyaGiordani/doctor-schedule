import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin, { TimeGridSlicer } from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/timegrid/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendarAppointment.css'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

export default class CalendarAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            date: null,
            address: props.address,
            time: null,
            availability:[],
            error: false,
            response: false,
            message: ''
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal, response: false, error: false, data: null, time: null });
    };
    
    handleEventClick = async(event) => {
        this.toggle();
        this.setState({ date: event.date });
        console.log(event.dateStr);
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAvailability`;
        await axios.get(URL, { 
            params: { 
                cpf: this.state.address.Cpf,
                appointmentDate: event.dateStr,
                addressId: this.state.address.AddressId
            }}).then(response => {
                this.setState({availability: response.data})
                }).catch(error => {
                console.log(error.response.data.mensagem);
                this.setState({response: true, message: error.response.data.mensagem})
            });
        console.log(this.state.availability)
    };

    handleSave = () => {
        if(this.state.time === null) {
           this.setState({error: true})
        }else {
            let hour = new Date(this.state.time).toLocaleTimeString()
            let date = new Date(this.state.date).toISOString().slice(0, 10)
            let newData = date + "T" + hour;
            let data = {
                AppointmentTime: newData,
                Status: 1,
                DoctorCpf: this.state.address.Cpf,
                PatientCpf: sessionStorage.getItem('code'),
                AddressId: this.state.address.AddressId
            }
            console.log("Data", data);
            const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments`;
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
                   this.setState({response: true, message: response.data.mensagem})
                }).catch(error => {
                   console.log(error)
            });
        }
    }

    handleChange = (event) => {
        this.setState({time: event.target.value});
    };

    render() {
        console.log("Address", this.state.address);
        return (
          <div className="calendar-appointment">
            <FullCalendar  
                defaultView="dayGridMonth"
                weekends={true}
                locales={[ptBrLocale]}
                header={{
                    left: "prev,next, today",
                    center: "title",
                    right: "dayGridMonth"
                }}
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]} 
                events={new Date()}
                selectable={true}
                dateClick= {this.handleEventClick}
            />
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
                    {!this.state.response &&
                        <div style={{display: "flex", flexDirection: "column"}}>
                        <FormControl disabled style={{color: "black"}}>
                            <InputLabel htmlFor="component-disabled" style={{color: "black"}}>Data</InputLabel>
                            <Input id="component-simple" style={{width: "6em", color: "black"}} value={new Date(this.state.date).toLocaleDateString()} />
                        </FormControl>
                        <FormControl style={{marginTop: "20px"}}>
                            <InputLabel id="demo-simple-select-label" error={this.state.error}>Horas</InputLabel>
                            <Select
                                error={this.state.error}
                                style={{width: "6em"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.time}
                                onChange={this.handleChange}
                            >
                            {this.state.availability.map((option) => (
                                <MenuItem value={option.availableStartDate}>
                                {new Date(option.availableStartDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                </MenuItem>
                            ))}
                            </Select>
                            {this.state.time === null && this.state.error && <FormHelperText style={{color:"red"}}>Escolha horario para consulta!</FormHelperText>}
                        </FormControl>
                        </div>
                    }
                    { this.state.response && <h5>{this.state.message}</h5> }
                </ModalBody>
                <ModalFooter>
                    { !this.state.response && <Button color="primary" onClick={this.handleSave}>Confirmar Consulta</Button> }{" "}
                    <Button color="outline-dark" onClick={this.toggle}>
                    Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
          </div>
      )
    }
  
  }