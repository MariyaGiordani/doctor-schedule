import React from 'react';
import TextField from '@material-ui/core/TextField';
import { userType } from '../../utils/userType';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import './Profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
            patient: null,
            isReady: false
        };
    }

    componentDidMount() {
      if(userType() === "Doctor") {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Doctors/GetDoctor`;
        axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}})
        .then(response => {
            console.log(response);
            this.setState({doctor: response.data, isReady: true});
        });
      }else {
        this.setState({isReady: true});
      }
    }

   render(){
    return (
        <div className="profile">
            { this.state.isReady &&
               <div className="profile-main">
                    <p> Profile Informação</p>
                    { userType() === "Doctor" ? 
                     <div style={{display: "flex", flexDirection: "column"}}>
                        <div className="form-group">
                            <InputLabel className="title" style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Primeiro Nome</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={this.state.doctor.firstName} variant="outlined"/>
                        </div>
                        <div className="form-group">
                            <InputLabel className="title" style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Sobrenome</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={this.state.doctor.lastName} variant="outlined"/> 
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">CPF</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={this.state.doctor.cpf} variant="outlined"/>  
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">CRM</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={this.state.doctor.crm} variant="outlined"/>
                        </div>
                        <div className="form-group">
                            <InputLabel className="title" style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Espicialidade</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={this.state.doctor.speciality} variant="outlined"/>
                        </div>
                    </div>:
                     <div style={{display: "flex", flexDirection: "column"}}>
                        <div className="form-group">
                            <InputLabel className="title" style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Primeiro Nome</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={sessionStorage.getItem('first')} variant="outlined"/>
                        </div>
                        <div className="form-group">
                            <InputLabel className="title" style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Sobrenome</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={sessionStorage.getItem('last')} variant="outlined"/> 
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">CPF</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" defaultValue={sessionStorage.getItem('code')} variant="outlined"/>  
                        </div>
                        <div className="form-group">
                            <InputLabel style={{color: "black", fontWeight: "600"}} htmlFor="bootstrap-input">Email</InputLabel>
                            <TextField disabled fullWidth id="outlined-required" style={{textTransform: "lowercase"}} defaultValue={sessionStorage.getItem('username')} variant="outlined"/>
                        </div>
                    </div>
                    }
                </div>
            }
        </div>
      )
    }
}