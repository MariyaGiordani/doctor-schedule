import React from 'react';
import mockDoctorEvents from '../../utils/mockDoctorEvent';
import Calendar from '../../components/Calendar/Calendar';
import './DashboardDoctor.css';

export default class DashboardDoctor extends React.Component {
  render() {
    console.log(mockDoctorEvents.mockDoctorEvents);
    return (
      <div className="dashboard-doctor--background">
        <div className="dashboard-doctor">
          <Calendar events={mockDoctorEvents.mockDoctorEvents}/>
        </div>
      </div>
    )
  }
}