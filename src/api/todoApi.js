
import axios from "axios";

const API = axios.create({
  baseURL: "https://6b0200d34a8cad87bd8f724e.mockapi.io/api/v1",
});

export const getTodos = async () => {
  const response = await API.get("/todos");
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await API.post("/todos", todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await API.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await API.delete(`/todos/${id}`);
  return response.data;
};
