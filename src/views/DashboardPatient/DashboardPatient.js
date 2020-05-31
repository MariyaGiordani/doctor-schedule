import React from 'react';
import mockPatientEvents from '../../utils/mockPatientEvents';
import ListPatient from '../../components/ListPatient/listPatient'
import './DashboardPatient.css';

export default class DashboardPatient extends React.Component {
   render(){
    return (
        <div className="dashboard-patient">
           <ListPatient/>
        </div>
      )
    }
}