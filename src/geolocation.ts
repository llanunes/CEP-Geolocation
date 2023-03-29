import axios, { AxiosResponse } from 'axios';

interface Geometry {
    lat: number;
    lng: number;
}

interface Result {
    geometry: Geometry;
}

interface OpenCageData {
    results: Result[];
    status: {
        code: number;
        message: string;
    };
}

const cep: String = '06230-080';

if (!cep.includes('-')) {
    console.error('Erro no CEP: modelo inválido')
    process.exit()
}

const url = `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=8c86308380ad443fac12280fd96b4ac5`;

axios.get<OpenCageData>(url)
    .then((response: AxiosResponse<OpenCageData>) => {
        const { lat, lng } = response.data.results[0].geometry;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    })
    .catch((error: any) => {
        if (error.response) {
            console.error('Erro na requisição HTTP:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro na requisição HTTP: sem resposta do servidor');
        } else {
            console.error('Erro ao configurar a requisição HTTP:', error.message);
        }
    });





