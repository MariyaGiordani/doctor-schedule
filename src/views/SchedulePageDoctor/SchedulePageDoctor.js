import React from 'react';
import './SchedulePageDoctor.css';
import DoctorAddresses from '../../components/DoctorAddresses/doctorAddresses';
import Schedule from '../../components/Schedule/schedule';
import axios from 'axios';

export default class SchedulePageDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        addresses: [],
        isReady: false
    };
  }

  async componentDidMount() {
    const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses/GetAddresses`;
    await axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}})
    .then(response => {
      this.setState({addresses: response.data, isReady: true})
    });
  }

   render(){
    return (
        <div className="schedule-doctor">
          {this.state.isReady && this.state.addresses.length === 2 && <DoctorAddresses addresses={this.state.addresses}/>}
          {this.state.isReady && this.state.addresses.length < 2 && <Schedule addresses={this.state.addresses}/>}
        </div>
      )
    }
}