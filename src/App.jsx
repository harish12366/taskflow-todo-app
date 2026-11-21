
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api/todoApi";

import "./index.css";

const initialState = {
  todos: [],
  loading: true,
  error: "",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: Array.isArray(action.payload)
          ? action.payload
          : [],
        loading: false,
        error: "",
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? action.payload
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    todoReducer,
    initialState
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        dispatch({
          type: "SET_TODOS",
          payload: Array.isArray(data) ? data : [],
        });
      } catch (error) {
        console.error("Fetch Error:", error);

        dispatch({
          type: "SET_ERROR",
          payload: "Unable to load tasks. Please try again.",
        });
      }
    };

    fetchTodos();
  }, []);

  // Add Todo
  const handleAddTodo = async (name, description) => {
    try {
      const newTodo = await createTodo({
        name,
        description,
        status: "Not Completed",
      });

      dispatch({
        type: "ADD_TODO",
        payload: newTodo,
      });

      return true;
    } catch (error) {
      console.error("Add Error:", error);
      return false;
    }
  };

  // Edit Todo
  const handleEditTodo = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);

      dispatch({
        type: "UPDATE_TODO",
        payload: updated,
      });

      return true;
    } catch (error) {
      console.error("Edit Error:", error);
      return false;
    }
  };

  // Delete Todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);

      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });

      return true;
    } catch (error) {
      console.error("Delete Error:", error);
      return false;
    }
  };

  // Change Status
  const handleStatusChange = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);

      dispatch({
        type: "UPDATE_TODO",
        payload: updated,
      });

      return true;
    } catch (error) {
      console.error("Status Error:", error);
      return false;
    }
  };

  return (
    <>
      <Header />

      <Main
        todos={Array.isArray(state.todos) ? state.todos : []}
        loading={state.loading}
        error={state.error}
        onAddTodo={handleAddTodo}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}

export default App;
