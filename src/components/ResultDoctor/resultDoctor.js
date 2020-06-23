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
           message: "",
           scroll: false,
           length: props.information.doctor.Addresses.length,
           addresses: [],
           messageScroll: false
        };
    }

    componentWillMount() {
        this.state.doctors.doctor.Addresses.map(item => {
            if(item.Status !== 2) {
                return  this.setState(prevState => ({
                addresses: [...prevState.addresses, item]
                }));
            }
            return null;
        });
        if(this.state.doctors.doctor.Addresses.length === 1) {
            this.setState({addressDoctor: this.state.doctors.doctor.Addresses[0]});
        }
        this.setState({message: "Atenção este médico atende em duas localidades. Escolha o endereço clicando no check."});
        console.log("Test",this.state.addresses, this.state.addresses.length)
    }

    componentDidMount() {
        this.state.addresses.length > 1 ? this.setState({avatar: true}) : this.setState({avatar: false, addressDoctor: this.state.doctors.doctor.Addresses[0], messageScroll: true});
        window.scrollTo(0, 0);
    }

    handleDays = (day) => {
        return ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"][day];
    }

    render() {
        const {doctors, avatar, calendar, id, addressDoctor} = this.state;
        const newMessage = "Atenção este médico atende em duas localidades.";
        console.log(this.state.doctors);
        console.log("AddressDoctor",this.state.addressDoctor);
        return (
            <div onWheel={ event => {
                if (event.nativeEvent.wheelDelta > 0) {
                  console.log('scroll up');
                  this.setState({scroll: true});
                  window.pageYOffset === 0 && this.setState({scroll: false});
                } else {
                  console.log('scroll down');
                  this.setState({scroll: true});
                }
              }}
             >
            { this.state.scroll && this.state.messageScroll &&
                <div className="info"> 
                    <h5 className="title">
                        Endereço: {this.state.addressDoctor.Street + " , " + this.state.addressDoctor.Number},
                        </h5>
                    <br></br>
                    <h5 className="title">
                        Horário de Atendimento:  {this.state.addressDoctor.TimeSheet.DaysOfTheWeeks.map((option) => (this.handleDays(option.Name))) + " " +
                                           new Date(this.state.addressDoctor.TimeSheet.StartDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                                            + " as " + 
                                           new Date(this.state.addressDoctor.TimeSheet.EndDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                    </h5>
                </div>
            }
            { this.state.addresses.length > 1 &&
               <h5 className="title-message">{this.state.message}</h5>
            }
            {doctors.doctor.Addresses.map((option) => (
                <div>
                    {(option.$id === id || id === null) && option.Status !== 2 &&
                        <div className="search-doctor search-margin">
                            {console.log("Option",option)}
                            { avatar &&
                                <Avatar onClick={event => {window.scrollTo(0, 0); this.setState({length: 1, calendar: true, addressDoctor: option, id: option.$id, avatar: false, message: newMessage, messageScroll: true})}} style={{backgroundColor:"#3f51b5"}}>
                                    <CheckCircleIcon />
                                </Avatar>
                            }
                            <List key={option.$id}> 
                                <ListItem className="text_family">
                                    Endereço: &nbsp;
                                    <ListItemText className="title" primary={option.Street + " , " + option.Number} />
                                </ListItem>
                                <ListItem className="text_family">
                                    Telefone: &nbsp;
                                    <ListItemText primary={option.Telephone} />
                                </ListItem>
                                <ListItem className="text_family">
                                    Horário de Atendimento:  &nbsp;
                                    <ListItemText className="title" 
                                       primary={
                                           option.TimeSheet.DaysOfTheWeeks.map((option) => (this.handleDays(option.Name))) + " " +
                                           new Date(option.TimeSheet.StartDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                                            + " as " + 
                                           new Date(option.TimeSheet.EndDate).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                    />
                                </ListItem>
                            </List>
                            <div className="search-doctor__information">
                                <ListItem style={{display: "block"}}>
                                    Informações Extras: &nbsp;
                                    {option.Information === "" ?
                                        <ListItemText primary="Não há informações extras." /> :
                                        <ListItemText className="title" primary={option.Information} />
                                    }
                                </ListItem>
                                <ListItem>
                                    Planos de Saúde: &nbsp;
                                    <ListItemText className="title" primary={option.HealthCare} />
                                </ListItem>
                            </div>
                        </div>
                    }
                </div>
            ))}
            { (this.state.addresses.length <= 1 || calendar) &&
                <CalendarAppointment address={addressDoctor}/>
            }
            </div>
        );
    }
  
}