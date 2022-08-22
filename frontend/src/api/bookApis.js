import axios from 'axios';
import { BACKEND_URL } from '../constants/axios';
const API = axios.create({
  baseURL:`${BACKEND_URL}`,
  withCredentials: true,
});

//books endpoints
export const addBook = (Data) => API.post('/addBook', Data);
export const editBookDetails = (Data,id) => API.put(`books/${id}`, Data);
export const deleteBookDetails = (Data,id) => API.delete(`/books/${id}`, Data);
