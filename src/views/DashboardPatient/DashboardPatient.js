import React from 'react';
import mockPatientEvents from '../../utils/mockPatientEvents'
import './DashboardPatient.css'
import SearchDoctor from '../../components/searchDoctor/searchDoctor'
import Calendar from '../../components/calendar/calendar'
import mockSearchDoctor from '../../utils/mockSearchDoctor';

export default class DashboardPatient extends React.Component {
   render(){
    return (
        <div className="dashboard-patient">
          <div className="dashboard-patient__doctor"> 
              <h5>Nome do Médico: Márcio Da Silva</h5>
          </div>
          <SearchDoctor information={mockSearchDoctor.mockSearchDoctor}></SearchDoctor>
          <Calendar events={mockPatientEvents.mockDoctorEvents}/>
        </div>
      )
    }
}