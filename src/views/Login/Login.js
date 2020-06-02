import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

    function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    let data = {
      UserName: email,
      Password: password,
    }

    event.preventDefault();
    const URL = `https://agendamedicoapi.azurewebsites.net/api/Users/Login`;
    axios(URL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'content-type': 'application/json;',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Accept': '/'
        },
        data: data
    })
        .then(response => { 
          sessionStorage.setItem("token", response.data.Objeto.Password);
          sessionStorage.setItem("user", response.data.Objeto.Patient === null ? "Doctor" : "Patient");
          response.data.Objeto.Patient === null ? sessionStorage.setItem("code", response.data.Objeto.Doctor.Cpf): sessionStorage.setItem("code", response.data.Objeto.Patient.Cpf);
          window.location.reload();
      }).catch(error => {
        setMessage(error.response.data.mensagem);
        setError(true);
    });
  }

  return (
    <div class="login">
      <div class="d-flex h-100 login__form">
        <div class="form">
          <div>
            <h1 className="text_style">Login</h1>
          </div>
          <div class="form">
            <form onSubmit={handleSubmit}>
              {
                error && 
                  <Alert variant="filled" severity="error">
                      {message}
                  </Alert>
              }
              <div className="text-right login--margin">
                  <a class="style" href="/signup">Crie uma conta</a>
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend w3-padding w3-xlarge w3-teal">
                  <span class="input-group-text"><PersonIcon fontSize="small" /></span>
                </div>
                <input className="form-control" placeholder="E-mail" autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><LockIcon fontSize="small" /></span>
                </div>
                <input className="form-control" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} type="password"/>
              </div>
              <div class="form-group d-flex justify-content-center">
                <button type="submit" block className="btn btn-primary btn-block" disabled={!validateForm()}>Fazer login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}