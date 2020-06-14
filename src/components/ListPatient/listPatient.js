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
import { Redirect } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

export default class ListPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            isReady: false,
            doctor: [],
            rescheduleDoctor: false,
            cancel: false,
            reschedule: false,
            message: ""

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

    toggle = () => {
        this.setState({ modal: !this.state.modal, response: false, error: false, data: null, time: null });
        window.location.reload();
    };

    handleSchedule = async() => {
        const URL = `https://agendamedicoapi.azurewebsites.net/api/Doctors/search`;
        await axios.get(URL, {
            params: {
                firstName: this.state.doctor.doctorFirstName,
                lastname: this.state.doctor.doctorLastName
            }
          })
          .then(response => {
                console.log(response);
                if(response.data.length > 1){
                    this.setState({ listDoctors: response.data, doctors: true });
                }else {
                    this.setState({ doctor: response.data[0], rescheduleDoctor: true});
                }
            }).catch(error => {
                console.log(error);
        });
    }

    handleCancel = () => {
        let data = {
            AppointmentId: this.state.doctor.appointmentId,
            AppointmentTime: this.state.doctor.appointmentTime,
            Status: 3,
            RescheludedAppointmentId: 0,
            DoctorCpf: this.state.doctor.doctorCpf,
            PatientCpf: this.state.doctor.patientCpf,
            AddressId: this.state.doctor.address.addressId
        }

        const URL = `https://agendamedicoapi.azurewebsites.net/api/Appointments/`;

        axios(URL + this.state.doctor.appointmentId, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'content-type': 'application/json;',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Accept': '/'
            },
            data: data,
        })
            .then(response => { 
                console.log(response);
                this.setState({cancel: false, message: response.data.mensagem})
            }).catch(error => {
                console.log(error);
        });
    };


    render(){
        console.log(this.state.appointments);
        const {doctor} = this.state
        return (
            <div className="list-patient">
                {this.state.isReady && this.state.appointments.length !== 0 &&
                    <TableContainer  component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead style={{backgroundColor: "#3f51b5"}}>
                                <TableRow>
                                    <TableCell style={{color:"white"}}>Remarcar</TableCell>
                                    <TableCell style={{color:"white"}}>Cancelar</TableCell>
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
                                    <TableCell value={item} component="th" scope="row" onClick={event => (this.setState({modal: !this.state.modal, doctor: item, reschedule: true, cancel: false}))}>
                                        <Avatar style={{backgroundColor:"#3f51b5"}}>
                                            <AssignmentIndIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell component="th" scope="row" onClick={event => (this.setState({modal: !this.state.modal, doctor: item, cancel: true, reschedule: false}))}>
                                        <Avatar style={{backgroundColor:"red"}}>
                                            <CancelIcon />
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
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            size="sm"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <ModalHeader style={{backgroundColor: "#007bff", color:"white"}} toggle={this.toggle}>
                                {console.log("Event", this.state.doctor)}
                            </ModalHeader>
                            <ModalBody>
                                { this.state.reschedule && <div>Confirma clicando no botão que você realmente gostaria de remarcar essa consulta!</div> }
                                { this.state.cancel && <div>Confirma clicando no botão que você realmente gostaria de cancelar essa consulta!</div> }
                                { !this.state.cancel && !this.state.reschedule  && <div>{this.state.message}</div> }
                            </ModalBody>
                            <ModalFooter>
                                { this.state.reschedule && <Button color="primary" onClick={this.handleSchedule}>Remarcar</Button> }{" "}
                                { this.state.cancel && <Button color="primary" onClick={this.handleCancel}>Confirmar</Button> }
                            </ModalFooter>
                        </Modal>
                    </TableContainer>
                }
                {
                    this.state.isReady && this.state.appointments.length === 0 &&
                    <div>
                        <p> Bem vindo na aplicativo de agendamento de Consultas Médicas!</p>
                        <p> {sessionStorage.getItem('first')} {sessionStorage.getItem('last')}, você não tem nenhuma consulta no momento!</p>
                        
                    </div>
                }
                {this.state.rescheduleDoctor && (
                    <Redirect to={{ pathname: '/result-doctor', state: {doctor}}} />
                )}
            </div>
        )
    }
}