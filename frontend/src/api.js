import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + 'todos/';

export const getTodos = () => axios.get(API_URL).then(res => res.data);
export const getTodo = (id) => axios.get(`${API_URL}${id}/`).then(res => res.data);
export const createTodo = (todo) => axios.post(API_URL, todo).then(res => res.data);
export const updateTodo = (id, data) => axios.patch(`${API_URL}${id}/`, data).then(res => res.data);
export const deleteTodo = (id) => axios.delete(`${API_URL}${id}/`).then(res => res.data); 