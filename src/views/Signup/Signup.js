import React from 'react';
import {Link} from 'react-router-dom';
import doctor from '../../assets/img/doctor-photo.png';
import Doctor from '../../assets/img/doctor.png';
import team from '../../assets/img/team.png';
import './Signup.css'
 
export default function Signup(props) {
  return (
    <div className="signup">
        <div className="row signup__body d-flex" align="center">
            <div id="doc" className="col-md signup__item d-flex justify-content-center" align="center"> 
                <Link to="/signup-doctor">
                    <img className="signup__img-doctor" alt="" src={doctor}/>
                    <img className="signup__img-doctor" alt=""  src={Doctor}/>
                    <br/>
                    Cadastro do Parceiro
                </Link>
            </div>
            <div id="pac" className="col-md signup__item d-flex justify-content-center" align="center">
                <Link to="/signup-patient">
                    <img className="signup__img-petient" alt="" src={team}/>
                    <br/>
                    Cadastro do Usuário
                </Link>
            </div>
        </div>
    </div>
  );
}