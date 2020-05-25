import React from 'react';
import mockDoctorEvents from '../../utils/mockDoctorEvent';
import Calendar from '../../components/Calendar/calendar';

export default class DashboardDoctor extends React.Component {
  render() {
    console.log(mockDoctorEvents.mockDoctorEvents);
    return (
      <div>
        <Calendar events={mockDoctorEvents.mockDoctorEvents}/>
      </div>
    )
  }
}