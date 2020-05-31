import React from 'react';
import './listPatient.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

export default class ListPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []

        };
    }

    componentWillMount() {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAppointments`;
        axios.get(URL, { 
            params: { 
                cpf: sessionStorage.getItem('code')
            }}).then(response => {
                this.setState({appointments: response.data})
            });
    }


    render(){
        console.log(this.state.appointments)
        return (
            <div className="list-patient">
                <TableContainer  component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead style={{backgroundColor: "#3f51b5"}}>
                            <TableRow>
                                <TableCell style={{color:"white"}}>Ação</TableCell>
                                <TableCell style={{color:"white"}} align="left">Data</TableCell>
                                <TableCell style={{color:"white"}} align="left">Horário</TableCell>
                                <TableCell style={{color:"white"}} align="left">Nome do Médico</TableCell>
                                <TableCell style={{color:"white"}} align="left">Endereço</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.appointments.map((item) =>  (
                            <TableRow key={item.appointmentId}>
                                {console.log(item.appointmentTime)}
                                <TableCell component="th" scope="row">
                                    <Avatar style={{backgroundColor:"#3f51b5"}}>
                                        <AssignmentIndIcon />
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left">{new Date(item.appointmentTime).toLocaleDateString()}</TableCell>
                                <TableCell align="left">{new Date(item.appointmentTime).toLocaleTimeString()}</TableCell>
                                <TableCell align="left">{item.doctor}</TableCell>
                                <TableCell align="left">{item.address}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}