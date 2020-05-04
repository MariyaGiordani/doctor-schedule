import React, { Component } from "react";
import './searchDoctor.css'
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
        return (
            <div className="search-doctor">
                <List> 
                    {this.state.mockSearchDoctor.map((item) => (
                        <ListItem key={item.key}>
                            {item.title} 
                            <ListItemText primary={item.information} />
                        </ListItem>
                    ))}
                </List>
                <div className="search-doctor__information">
                    <h6>Informações Extras: </h6>
                    <TextareaAutosize
                        className="information"
                        rowsMax={4}
                        aria-label="maximum height width"
                        placeholder=""
                        value={this.state.information}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
  
}