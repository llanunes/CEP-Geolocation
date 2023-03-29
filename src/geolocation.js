const axios = require('axios');
const { exit } = require('process');

const cep = '06130-090';

if (!cep.includes('-')) {
    console.error('Erro no CEP: modelo inválido')
    exit()
}

const url = `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=8c86308380ad443fac12280fd96b4ac5`;

axios.get(url)
    .then(response => {
        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        } else {
            console.log('Nenhum resultado encontrado para o CEP informado');
        }
    })
    .catch(error => {
        if (error.response) {
            console.error('Erro na requisição HTTP:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro na requisição HTTP: sem resposta do servidor');
        } else {
            console.error('Erro ao configurar a requisição HTTP:', error.message);
        }
    }); 