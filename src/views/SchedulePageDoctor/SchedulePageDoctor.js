import React from 'react';
import './SchedulePageDoctor.css'
import Schedule from '../../components/Schedule/schedule';

export default class SchedulePageDoctor extends React.Component {
   render(){
    return (
        <div className="schedule-doctor">
          <Schedule></Schedule>
        </div>
      )
    }
}