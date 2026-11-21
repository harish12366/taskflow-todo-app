
import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";

import {
  getTodos,
  createTodo,
  updateTodo as updateTodoAPI,
  deleteTodo as deleteTodoAPI,
} from "./api/todoApi";

// Initial State
const initialState = {
  todos: [],
  loading: true,
  error: "",
};

// Reducer Function
function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: "",
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        error: "",
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? action.payload
            : todo
        ),
        error: "",
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
        error: "",
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
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

  // GET - Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });

        const response = await getTodos();

        dispatch({
          type: "SET_TODOS",
          payload: response.data,
        });

      } catch (error) {
        console.error("Fetch Error:", error);

        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch tasks. Please try again.",
        });
      }
    };

    fetchTodos();
  }, []);

  // POST - Add Todo
  const addTodo = async (name, description) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      const newTodo = {
        name,
        description,
        status: "Not Completed",
      };

      const response = await createTodo(newTodo);

      dispatch({
        type: "ADD_TODO",
        payload: response.data,
      });

      return true;

    } catch (error) {
      console.error("Add Error:", error);

      dispatch({
        type: "SET_ERROR",
        payload: "Failed to add task.",
      });

      return false;
    }
  };

  // PUT - Edit Todo / Change Status
  const editTodo = async (id, updatedData) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      const response = await updateTodoAPI(
        id,
        updatedData
      );

      dispatch({
        type: "UPDATE_TODO",
        payload: response.data,
      });

      return true;

    } catch (error) {
      console.error("Update Error:", error);

      dispatch({
        type: "SET_ERROR",
        payload: "Failed to update task.",
      });

      return false;
    }
  };

  // DELETE - Remove Todo
  const removeTodo = async (id) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      await deleteTodoAPI(id);

      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });

      return true;

    } catch (error) {
      console.error("Delete Error:", error);

      dispatch({
        type: "SET_ERROR",
        payload: "Failed to delete task.",
      });

      return false;
    }
  };

  return (
    <>
      <Header />

      <Main
        todos={state.todos}
        loading={state.loading}
        error={state.error}
        onAddTodo={addTodo}
        onEditTodo={editTodo}
        onDeleteTodo={removeTodo}
        onStatusChange={editTodo}
      />
    </>
  );
}

export default App;
