import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://json-server-ex-b96v.onrender.com',
    baseURL:'https://sitepessoalapi.onrender.com/api'
});

export default api;