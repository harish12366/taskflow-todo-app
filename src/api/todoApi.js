
import axios from "axios";

const API = axios.create({
  baseURL: "https://6b01ef0c4a8cad87bd8f61da.mockapi.io/api/v1",
});

// GET - Fetch all todos
export const getTodos = () => {
  return API.get("/todos");
};

// POST - Add todo
export const createTodo = (todo) => {
  return API.post("/todos", todo);
};

// PUT - Update todo
export const updateTodo = (id, updatedData) => {
  return API.put(`/todos/${id}`, updatedData);
};

// DELETE - Delete todo
export const deleteTodo = (id) => {
  return API.delete(`/todos/${id}`);
};
