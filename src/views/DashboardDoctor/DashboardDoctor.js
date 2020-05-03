import React from 'react'
import { showNavBar } from '../../utils/showNavBar';
import mockDoctorEvents from '../../utils/mockDoctorEvent'
import Calendar from '../../components/calendar/calendar'

export default class DashboardDoctor extends React.Component {
  render() {
    console.log(mockDoctorEvents.mockDoctorEvents);
    return (
      <div>
        {showNavBar()}
        <Calendar events={mockDoctorEvents.mockDoctorEvents}/>
      </div>
    )
  }
}