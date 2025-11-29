import axios from 'axios';

// Get the base URL from the environment variable
const API_URL = import.meta.env.VITE_APP_API_URL;
const TODOS_ENDPOINT = `${API_URL}/todos`;

// --- READ (GET) ---
export const getTodosAPI = async () => {
    // axios.get() is used for GET requests
    const response = await axios.get(`${TODOS_ENDPOINT}?_limit=10`);
    // Axios returns the relevant data inside the 'data' property
    return response.data;
};

// --- CREATE (POST) ---
export const addTodoAPI = async (newTodo) => {
    // axios.post() is used for POST requests.
    const response = await axios.post(TODOS_ENDPOINT, newTodo);
    return response.data;
};

// --- UPDATE (PUT) ---
export const updateTodoAPI = async (todo) => {
    // axios.put() is used for PUT requests
    const response = await axios.put(`${TODOS_ENDPOINT}/${todo.id}`, todo);
    return response.data;
};

// --- DELETE (DELETE) ---
export const deleteTodoAPI = async (id) => {
    // axios.delete() is used for DELETE requests
    await axios.delete(`${TODOS_ENDPOINT}/${id}`);
    // Return the ID so the reducer can easily update the state
    return id;
};