import React, { Component } from "react";
import './resultDoctor.css'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import CalendarAppointment from '../../components/CalendarAppointment/calendarAppointment';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           addressDoctor: [],
           avatar: false,
           doctors: props.information,
           calendar: false,
           id: null,
           message: ""
        };
    }

    componentWillMount() {
       this.state.doctors.doctor.Addresses.length > 1 ? this.setState({avatar: true}) : this.setState({avatar: false, addressDoctor: this.state.doctors.doctor.Addresses[0]});
       this.setState({message: "Atenção este médico atende em duas localidades. Escolha endereço clicando no check."})
    }

    handleDays = (day) => {
        return ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"][day];
    }

    render() {
        const {doctors, avatar, calendar, id, addressDoctor} = this.state;
        const newMessage = "Atenção este médico atende em duas localidades.";
        return (
            <div>
            { doctors.doctor.Addresses.length > 1 &&
               <h5 className="title-message">{this.state.message}</h5>
            }
            {doctors.doctor.Addresses.map((option) => (
                <div>
                    {(option.$id === id || id === null) &&
                        <div className="search-doctor">
                            {console.log("Option",option)}
                            { avatar &&
                                <Avatar onClick={event => (this.setState({calendar: true, addressDoctor: option, id: option.$id, avatar: false, message: newMessage}))} style={{backgroundColor:"#3f51b5"}}>
                                    <CheckCircleIcon />
                                </Avatar>
                            }
                            <List key={option.$id}> 
                                <ListItem>
                                    Endereço: &nbsp;
                                    <ListItemText className="title" primary={option.Street + " , " + option.Number} />
                                </ListItem>
                                <ListItem>
                                    Telefone: &nbsp;
                                    <ListItemText primary={option.Telephone} />
                                </ListItem>
                                <ListItem>
                                    Horário de Atendimento: &nbsp;
                                    <ListItemText className="title" 
                                       primary={
                                           option.TimeSheet.DaysOfTheWeeks.map((option) => (this.handleDays(option.Name))) + " " +
                                           new Date(option.TimeSheet.StartDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                                            + " as " + 
                                           new Date(option.TimeSheet.EndDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                    />
                                </ListItem>
                                <ListItem>
                                    Planos de Saúde: &nbsp;
                                    <ListItemText className="title" primary={option.HealthCare} />
                                </ListItem>
                            </List>
                            <div className="search-doctor__information">
                                <ListItem style={{display: "block"}}>
                                    Informações Extras: &nbsp;
                                    {option.Information === "" ?
                                        <ListItemText primary="Não tem informação adicional!" /> :
                                        <ListItemText className="title" primary={option.Information} />
                                    }
                                </ListItem>
                            </div>
                        </div>
                    }
                </div>
            ))}
            { (doctors.doctor.Addresses.length <= 1 || calendar) &&
                <CalendarAppointment address={addressDoctor}/>
            }
            </div>
        );
    }
  
}