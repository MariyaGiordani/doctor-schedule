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
        isReady: false,
    };
  }

  async componentDidMount() {
    const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses/GetAddresses`;
    let response = await axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}})
    .then(response => {
      return response.data;
      // this.setState({ addresses: response.data, isReady: true});
    });
    response.map(item => {
      if(item.status !== 2) {
        return  this.setState(prevState => ({
          addresses: [...prevState.addresses, item]
        }));
      }
      return null;
    });
    this.setState({isReady: true});
    console.log(this.state.addresses)
  }

   render(){
    console.log(this.state.addresses.length)
    return (
        <div className="schedule-doctor">
          {this.state.isReady && <DoctorAddresses addresses={this.state.addresses}/>}
        </div>
      )
    }
}