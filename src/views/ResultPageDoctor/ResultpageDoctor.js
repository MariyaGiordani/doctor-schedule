import React from 'react';
import './ResultPageDoctor.css'
import ResultDoctor from '../../components/ResultDoctor/resultDoctor'
import Calendar from '../../components/Calendar/calendar'
import mockResultDoctor from '../../utils/mockSearchDoctor';
import mockSearchDoctor from '../../utils/mockSearchDoctor';

export default class ResultPageDoctor extends React.Component {
   render(){
    console.log(this.props.location.state.doctor);
     console.log(this.props.location.state.doctor.Addresses[0]);
    return (
        <div className="result-doctor">
          <div className="result-doctor__title"> 
              <h5 className="title">Nome do Médico: {this.props.location.state.doctor.FirstName} {this.props.location.state.doctor.LastName}</h5>
          </div>
          <ResultDoctor information={this.props.location.state}></ResultDoctor>
          <Calendar events={mockResultDoctor.mockResultDoctor}/>
        </div>
      )
    }
}