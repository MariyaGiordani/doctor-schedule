import React from 'react';
import {Link} from 'react-router-dom';
import doctor from '../../assets/img/doctor-photo.png';
import Doctor from '../../assets/img/doctor.png';
import team from '../../assets/img/team.png';
import './Signup.css'
 
export default function Signup(props) {
  return (
    <div className="signup">
        <h4>Para efetuar seu cadastro precisa escolher uma dos opições em baixo</h4>
        <div className="signup__body">
            <div className="signup__item"> 
                <Link to="/signup-doctor">
                    <img className="signup__img-doctor" src={doctor}/>
                    <img className="signup__img-doctor" src={Doctor}/>
                    <br/>
                    Cadastro de Doutor
                </Link>
            </div>
            <div className="signup__item">
                <Link to="/signup-patient">
                    <img className="signup__img-petient" src={team}/>
                    <br/>
                    Cadastro de Paciente
                </Link>
            </div>
        </div>
    </div>
  );
}