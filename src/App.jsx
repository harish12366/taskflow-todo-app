
import { useEffect, useReducer, useState } from "react";

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

  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        dispatch({
          type: "SET_TODOS",
          payload: data,
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

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!todoName.trim()) return;

    try {
      const newTodo = await createTodo({
        name: todoName.trim(),
        description: description.trim(),
        status: "pending",
      });

      dispatch({
        type: "ADD_TODO",
        payload: newTodo,
      });

      setTodoName("");
      setDescription("");
    } catch (error) {
      console.error("Add Error:", error);
      alert("Unable to add task.");
    }
  };

  const handleStatus = async (todo) => {
    const updatedStatus =
      todo.status === "completed" ? "pending" : "completed";

    try {
      const updated = await updateTodo(todo.id, {
        ...todo,
        status: updatedStatus,
      });

      dispatch({
        type: "UPDATE_TODO",
        payload: updated,
      });
    } catch (error) {
      console.error("Status Update Error:", error);
      alert("Unable to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTodo(id);

      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete task.");
    }
  };

  const todos = Array.isArray(state.todos)
    ? state.todos
    : [];

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.status === "completed";
    }

    if (filter === "pending") {
      return todo.status !== "completed";
    }

    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;

  const pendingCount = todos.length - completedCount;

  if (state.loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (state.error) {
    return <div className="error-message">{state.error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <p>Organize your day, one task at a time.</p>
      </header>

      <main className="todo-container">
        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{todos.length}</h2>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{completedCount}</h2>
          </div>
        </section>

        <form className="todo-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Enter task name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">+ Add Task</button>
        </form>

        <section className="todo-section">
          <div className="todo-heading">
            <h2>My Tasks</h2>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>
              <p>Add a task to get started.</p>
            </div>
          ) : (
            <div className="todo-list">
              {filteredTodos.map((todo) => (
                <div className="todo-card" key={todo.id}>
                  <div className="todo-content">
                    <h3
                      className={
                        todo.status === "completed"
                          ? "completed"
                          : ""
                      }
                    >
                      {todo.name}
                    </h3>

                    <p>{todo.description}</p>

                    <span
                      className={
                        todo.status === "completed"
                          ? "completed-badge"
                          : "pending-badge"
                      }
                    >
                      {todo.status || "pending"}
                    </span>
                  </div>

                  <div className="todo-actions">
                    <button
                      onClick={() => handleStatus(todo)}
                      className="status-btn"
                    >
                      {todo.status === "completed"
                        ? "Undo"
                        : "Complete"}
                    </button>

                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
