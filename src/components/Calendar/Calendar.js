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
import './calendar.css'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import axios from 'axios';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }
    
    componentDidMount() {
      const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAppointments`;
      axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}}).then(response => {
          console.log(response.data);
          let events = response.data.map((option) => (
            { title: option.patientFirstName + " " + option.patientLastName,  start: option.appointmentTime, end: option.appointmentEndTime}
          ));
          this.setState({events: events})
      });
    }

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
            />
          </div>
      )
    }
  
  }