import axios from 'axios';


const api = axios.create({baseURL:'https://toolsapi.herokuapp.com'});
export default api;