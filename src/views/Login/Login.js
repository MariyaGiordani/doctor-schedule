import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log("Login", event.value)
    event.preventDefault();
  }

  return (
    <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
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
          <div className="forgot-password text-right login--margin">
              Forgot <a href="#">password?</a>
          </div>
        </form>
    </div>
  );
}