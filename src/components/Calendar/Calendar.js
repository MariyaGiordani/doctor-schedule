import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/timegrid/main.css';
import './Calendar.css'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
              title: "",
              start: new Date()
            },
            modal: false,
            message: ""
        };
    }
    
    componentDidMount() {
      const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAppointments`;
      axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}}).then(response => {
          console.log(response.data);
          let events = response.data.map((option) => (
            { 
              title: option.patientFirstName + " " + option.patientLastName,  
              start: option.appointmentTime, 
              end: option.appointmentEndTime,
              appointmentId: option.appointmentId,
              doctorCpf: option.doctorCpf,
              patientCpf: option.patientCpf,
              addressId: option.address.addressId
            }
          ));
          this.setState({events: events})
      });
    }

    toggle = () => {
      this.setState({ modal: !this.state.modal, response: false, error: false, data: null, time: null });
    };
    
    handleEventClick = ({ event, el }) => {
      this.toggle();
      this.setState({ event });
      console.log(this.state.event)
    };

    handleCancel = () => {
      let data = {
          AppointmentId: this.state.event.extendedProps.addressId,
          AppointmentTime: this.state.event.start,
          Status: 3,
          RescheludedAppointmentId: 0,
          DoctorCpf: this.state.event.extendedProps.doctorCpf,
          PatientCpf: this.state.event.extendedProps.patientCpf,
          AddressId: this.state.event.extendedProps.addressId
      }
      console.log(data)

      // const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/`;

      // axios(URL + this.state.event.extendedProps.addressId, {
      //     method: 'PUT',
      //     headers: {
      //         'Access-Control-Allow-Origin': 'http://localhost:3000',
      //         'content-type': 'application/json;',
      //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //         'Access-Control-Allow-Headers': '*',
      //         'Accept': '/'
      //     },
      //     data: data,
      // })
      //     .then(response => { 
      //         console.log(response);
      //         this.setState({cancel: true, message: response.mensagem})
      //     }).catch(error => {
      //         console.log(error);
      // });
    };

    render() {
        console.log(this.state.events);
        return (
          <div className="calendar">
            <FullCalendar  
              defaultView="dayGridMonth"
              locales={[ptBrLocale]}
              header={{
              left: "prev,next, today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]} 
              events={this.state.events}
              selectable={true}
              eventRender={this.handleEventRender}
              eventClick={this.handleEventClick}
            />
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader style={{backgroundColor: "#007bff", color:"white"}} toggle={this.toggle}>
                  Nome do Paciente: {this.state.event.title}
                </ModalHeader>
                <ModalBody>
                  {
                    !this.state.cancel &&
                      <div style={{display: "flex", flexDirection: "column"}}>
                        <FormControl disabled style={{color: "black"}}>
                          <InputLabel htmlFor="component-disabled" style={{color: "black"}}>Data</InputLabel>
                          <Input id="component-simple" style={{width: "6em", color: "black"}} value={new Date(this.state.event.start).toLocaleDateString()} />
                        </FormControl>
                        <FormControl disabled style={{color: "black", marginTop: "20px"}}>
                          <InputLabel htmlFor="component-disabled" style={{color: "black"}}>Time</InputLabel>
                          <Input id="component-simple" style={{width: "6em", color: "black"}} value={new Date(this.state.event.start).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} />
                        </FormControl>
                      </div>
                  }
                  { this.state.cancel && <div>{this.state.message}</div> }
                </ModalBody>
                <ModalFooter>
                    {!this.state.cancel && <Button color="primary" onClick={this.handleCancel}>Cancelar Consulta</Button>}
                </ModalFooter>
            </Modal>
          </div>
      )
    }
  
  }