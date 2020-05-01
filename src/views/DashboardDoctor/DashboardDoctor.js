import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { showNavBar } from '../../utils/showNavBar';

export default class DashboardDoctor extends React.Component {

  render() {
    return (
      <div>
        {showNavBar()}
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
      </div>
    )
  }

}