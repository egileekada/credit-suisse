import axios from 'axios'; 
// import { API_BASE_ENDPOINT } from '../BasicUrl';
import { BASEURL } from '../config/BasicUrl/Url';

export default axios.create({
  baseURL: BASEURL.URL
})