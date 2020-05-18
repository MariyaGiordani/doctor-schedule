import React from 'react';
import mockPatientEvents from '../../utils/mockPatientEvents';
import './DashboardPatient.css';
import Calendar from '../../components/Calendar/calendar';

export default class DashboardPatient extends React.Component {
   render(){
    return (
      <div>
        <div className="dashboard-patient">
          <Calendar events={mockPatientEvents.mockDoctorEvents}/>
        </div>
      </div>
      )
    }
}