import React from 'react';
import './SchedulePageDoctor.css'
import Schedule from '../../components/Schedule/schedule';
import axios from 'axios';

export default class SchedulePageDoctor extends React.Component {
  getAddresses = () => {
    const URL = `curl -X GET "https://agendamedicoapi.azurewebsites.net/api/Addresses/GetAddresses`;
    axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}}).then(response => {return response.data.length;});
  }

   render(){
    return (
        <div className="schedule-doctor">
          <Schedule></Schedule>
        </div>
      )
    }
}