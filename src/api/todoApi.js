
import axios from "axios";

const API = axios.create({
  baseURL:
    "https://6b0200d34a8cad87bd8f724d.mockapi.io/api/v1",
});

// GET - Fetch all todos
export const getTodos = async () => {
  const response = await API.get("/todos");

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid Todo API response");
  }

  return response.data;
};

// POST - Add todo
export const createTodo = async (todo) => {
  const response = await API.post("/todos", todo);
  return response.data;
};

// PUT - Update todo
export const updateTodo = async (id, todo) => {
  const response = await API.put(`/todos/${id}`, todo);
  return response.data;
};

// DELETE - Delete todo
export const deleteTodo = async (id) => {
  const response = await API.delete(`/todos/${id}`);
  return response.data;
};
