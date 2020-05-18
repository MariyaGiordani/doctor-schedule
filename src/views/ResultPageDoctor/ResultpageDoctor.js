import React from 'react';
import './ResultPageDoctor.css'
import ResultDoctor from '../../components/ResultDoctor/resultDoctor'
import Calendar from '../../components/Calendar/calendar'
import mockResultDoctor from '../../utils/mockSearchDoctor';
import mockSearchDoctor from '../../utils/mockSearchDoctor';

export default class ResultPageDoctor extends React.Component {
   render(){
    return (
        <div className="result-doctor">
          <div className="result-doctor__title"> 
              <h5>Nome do Médico: Márcio Da Silva</h5>
          </div>
          <ResultDoctor information={mockSearchDoctor.mockSearchDoctor}></ResultDoctor>
          <Calendar events={mockResultDoctor.mockResultDoctor}/>
        </div>
      )
    }
}