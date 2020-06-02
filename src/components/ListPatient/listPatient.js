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
            appointments: [],
            isReady: false

        };
    }

    async componentWillMount() {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/GetAppointments`;
        await axios.get(URL, { 
            params: { 
                cpf: sessionStorage.getItem('code')
            }}).then(response => {
                this.setState({appointments: response.data, isReady: true});
            });
    }


    render(){
        console.log(this.state.appointments)
        return (
            <div className="list-patient">
                {this.state.isReady &&
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
                                <TableRow key={item.address.addressId}>
                                    {console.log(item.appointmentTime)}
                                    <TableCell component="th" scope="row">
                                        <Avatar style={{backgroundColor:"#3f51b5"}}>
                                            <AssignmentIndIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell align="left">{new Date(item.appointmentTime).toLocaleDateString()}</TableCell>
                                    <TableCell align="left">{new Date(item.appointmentTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</TableCell>
                                    <TableCell align="left">{item.doctorFirstName + " " + item.doctorLastName}</TableCell>
                                    <TableCell align="left">{item.address.street}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        )
    }
}