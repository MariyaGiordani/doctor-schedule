import React, { Component } from "react";
import 'react-dropdown/style.css';
import options from '../../utils/specialtyDoctor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import './SearchPage.css';
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";


export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            specialty: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, hasError: false});
        
        return true;
    }

    handleClick() {
        this.setState({ hasError: false });
        if(this.state.specialty === null) {
            this.setState({ errorSpecialty: true });
        }

        if (this.state.specialty === null || this.state.name === "" ) {
          this.setState({ hasError: true });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const { hasError} = this.state;
        return (
            <div className="search-page">
                {!this.state.submitted && !this.state.submitError &&
                <form className="search-page__form" onSubmit={this.handleSubmit}>
                    <h3 className="search-page--margin">Registro de Médico</h3>
                    <FormControl fullWidth variant="outlined" error={hasError}>
                        <div className="form-group">
                            <TextField fullWidth name="name" error={this.state.firstName === "" && hasError ? true : false}  value={this.state.firstName} label="Nome do Médico*" variant="outlined" type="text" onChange={this.handleChange} inputProps={{ maxLength: 40,}} />
                            {this.state.firstName === "" && hasError && <FormHelperText>Digita seu Primeiro nome!</FormHelperText>}
                        </div>

                        <div className="form-group">
                            <InputLabel className="signup-doctor--position" error={this.state.errorSpecialty}>Especialidade</InputLabel>
                            <Select
                                fullWidth
                                error={this.state.errorSpecialty}
                                name="specialty"
                                onChange={this.handleChange}
                                label="Especialidade*"
                            >
                                {options.specialtyDoctor.map((option) => (
                                    <MenuItem key={option.value} value={option.label}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {this.state.specialty === null && hasError && <FormHelperText>Escolhe um dos Especialidade!</FormHelperText>}
                        </div>
                    </FormControl>
                    <button type="submit" className="btn btn-primary" onClick={() => this.handleClick()}>Pesquisar</button>
                </form>}
            </div>
        );
    }
}