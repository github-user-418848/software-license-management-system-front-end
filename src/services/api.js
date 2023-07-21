import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_PATH;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const login = (loginData) => {
  return apiClient.post('/login/', loginData);
};

// export const createTodo = (todoData) => {
//   return apiClient.post('/todos', todoData);
// };

// export const updateTodo = (id, todoData) => {
//   return apiClient.put(`/todos/${id}`, todoData);
// };

// export const deleteTodo = (id) => {
//   return apiClient.delete(`/todos/${id}`);
// };
