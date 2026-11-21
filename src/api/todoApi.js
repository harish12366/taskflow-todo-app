
import axios from "axios";

const API = axios.create({
  baseURL: "https://6b0200d34a8cad87bd8f724e.mockapi.io/api/v1",
});

// GET - Fetch all todos
export const getTodos = async () => {
  const response = await API.get("/todos");
  return response.data;
};

// POST - Create a new todo
export const createTodo = async (todo) => {
  const response = await API.post("/todos", todo);
  return response.data;
};

// PUT - Update an existing todo
export const updateTodo = async (id, todo) => {
  const response = await API.put(`/todos/${id}`, todo);
  return response.data;
};

// DELETE - Delete a todo
export const deleteTodo = async (id) => {
  const response = await API.delete(`/todos/${id}`);
  return response.data;
};
