import React from 'react';
import './ResultPageDoctor.css'
import ResultDoctor from '../../components/ResultDoctor/resultDoctor';

export default class ResultPageDoctor extends React.Component {
   render(){
    return (
        <div className="result-doctor">
          <div className="result-doctor__title"> 
              <h5 className="title">Nome do Médico: {this.props.location.state.doctor.FirstName} {this.props.location.state.doctor.LastName}</h5>
          </div>
          <ResultDoctor information={this.props.location.state}></ResultDoctor>
        </div>
      )
    }
}