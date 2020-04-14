import React from 'react';
import planilha from '../../assets/img/planilha.jpg'
import './Home.css'
 
function Home() {
  return (
    <div className="home">
       <p> Bem vindo na aplicativo de agendamento de Consultas Médicas!</p>
       <img className="home-img" src={planilha}/>
    </div>
  );
}
 
export default Home;