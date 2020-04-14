import React, { Component } from "react";
import './signupDoctor.css'

export default class SignupDoctor extends Component {
    render() {
        return (
            <div className="signup-doctor">
                <form className="signup-doctor__form">
                    <h3>Registro de Doutor</h3>
                    <div className="form-group">
                        <label>Primeiro nome</label>
                        <input type="text" className="form-control" placeholder="Primeiro nome" />
                    </div>

                    <div className="form-group">
                        <label>Último nome</label>
                        <input type="text" className="form-control" placeholder="Último nome" />
                    </div>

                    <div className="form-group">
                        <label>Endereço de e-mail</label>
                        <input type="email" className="form-control" placeholder="Endereço de e-mail" />
                    </div>
                    
                    <div className="form-group">
                        <label>CRM</label>
                        <input type="email" className="form-control" placeholder="Digita CRM valido" />
                    </div>

                    <div className="form-group">
                        <label>Especialidades</label>
                        <input type="email" className="form-control" placeholder="Digita sua especialidades" />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" className="form-control" placeholder="Entre senha" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Inscrever-se</button>
                    <p className="forgot-password text-right">
                        Já registrado <a href="/login">sign in?</a>
                    </p>
                </form>
            </div>
        );
    }
}