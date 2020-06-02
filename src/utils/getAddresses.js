import axios from 'axios';

export function getAddresses() {
    const URL = `https://agendamedicoapi.azurewebsites.net/api/Addresses/GetAddresses`;
    axios.get(URL, { params: { cpf: sessionStorage.getItem('code')}})
    .then(response => {
      return response.data;
    });
}