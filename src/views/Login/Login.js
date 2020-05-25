import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import { Redirect } from 'react-router';
import Alert from '@material-ui/lab/Alert';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toDashboardDoctor, setToDashboardDoctor] = useState(false);
  const [toDashboardPatient, setToDashboardPatient] = useState(false);
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
          localStorage.setItem("token", response.data.Objeto.Password);
          localStorage.setItem("user", response.data.Objeto.Patient === null ? "Doctor" : "Patient");
          response.data.Objeto.Patient === null ? setToDashboardDoctor(true) : setToDashboardPatient(true);
      }).catch(error => {
        setMessage(error.response.data.mensagem);
        setError(true);
    });
  }

  return (
    <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          {
            error && 
              <Alert variant="filled" severity="error">
                  {message}
              </Alert>
          }
          <h3>Sign In</h3>

          <div className="form-group">
              <label>Email</label>
              <input className="form-control" placeholder="Endereço de e-mail" autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>

          <div className="form-group">
              <label>Senha</label>
              <input className="form-control" placeholder="Entre senha" value={password} onChange={e => setPassword(e.target.value)} type="password"/>
          </div>

          <div className="form-group">
              <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
          </div>

          <button type="submit" block className="btn btn-primary btn-block" disabled={!validateForm()}>Fazer login</button>
          <div className="text-right login--margin">
              Não tem uma conta?
              <br/>
              <a href="/signup">Crie uma</a>
          </div>
        </form>
        {toDashboardPatient && (
          <Redirect to={'/dashboard-patient'}/>
        )}
        {toDashboardDoctor && (
          <Redirect to={'/dashboard-doctor'}/>
        )}
    </div>
  );
}