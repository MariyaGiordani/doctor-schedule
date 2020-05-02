import React from 'react'
import { showNavBar } from '../../utils/showNavBar';
import Calendar from '../../components/Calendar/Calendar';
import mockDoctorEvents from '../../utils/mockDoctorEvent'

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