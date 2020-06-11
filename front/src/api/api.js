import axios from 'axios';

<<<<<<< HEAD
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});
=======
const api = axios.create({ baseURL: 'http://localhost:3300'});
// const api = axios.create({ baseURL: 'http://matchapi.guillaumerx.fr:3300'});
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});
>>>>>>> select episode ok | before rebase from guroux

export default api;