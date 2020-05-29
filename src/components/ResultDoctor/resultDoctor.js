import React, { Component } from "react";
import './resultDoctor.css'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import List from '@material-ui/core/List';

export default class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           information:'',
           mockSearchDoctor: props.information
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, hasError: false});
        
        return true;
    }

    render() {
        const {mockSearchDoctor} = this.state;
        return (
            <div>
            {mockSearchDoctor.doctor.Addresses.map((option) => (
                <div className="search-doctor">
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
                            <ListItemText  />
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
            ))}
            </div>
        );
    }
  
}