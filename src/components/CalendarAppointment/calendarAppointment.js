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
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendarAppointment.css'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

export default class CalendarAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            date: null,
            address: props.address
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    
    handleEventClick = (event) => {
        this.toggle();
        this.setState({ date: event.date });
        console.log(event.dateStr);
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAvailability`;
        axios.get(URL, { 
            params: { 
                cpf: 43536178293,
                appointmentDate: event.dateStr,
                addressId: 2
            }}).then(response => {console.log(response.data);});
    };

    render() {
        console.log("Address", this.state.address)
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader toggle={this.toggle}>
                    Test
                </ModalHeader>
                <ModalBody>
                    <div>
                    <p>Test</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Confirmar Consulta</Button>{" "}
                    <Button color="outline-dark" onClick={this.toggle}>
                    Cancel
                    </Button>
                </ModalFooter>
            </Modal>
          </div>
      )
    }
  
  }