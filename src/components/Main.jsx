
import { useState } from "react";
import TodoCard from "./TodoCard";

function Main({
  todos = [],
  loading,
  error,
  onAddTodo,
  onDeleteTodo,
  onEditTodo,
  onStatusChange,
}) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [hideAllTasks, setHideAllTasks] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const safeTodos = Array.isArray(todos) ? todos : [];

  // Add Todo
  const handleAddTodo = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!taskName.trim()) {
      newErrors.taskName = "Task name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const success = await onAddTodo(
        taskName.trim(),
        description.trim()
      );

      if (success) {
        setTaskName("");
        setDescription("");
        setErrors({});
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Clear Form
  const handleClear = () => {
    setTaskName("");
    setDescription("");
    setErrors({});
  };

  // Filter Todos
  const filteredTodos = safeTodos.filter((todo) => {
    if (filter === "All") {
      return true;
    }

    return todo.status === filter;
  });

  // Statistics
  const totalTasks = safeTodos.length;

  const completedTasks = safeTodos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pendingTasks = safeTodos.filter(
    (todo) => todo.status === "Not Completed"
  ).length;

  return (
    <main className="main-content">

      {/* Hero Section */}
      <section className="hero">
        <h1>Make every day count.</h1>
        <p>
          Organize your work. Stay focused. Get things done.
        </p>
      </section>

      {/* Statistics */}
      <section className="stats-container">
        <div className="stat-card">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
      </section>

      {/* Add Todo Form */}
      <section className="todo-form">
        <div className="form-heading">
          <h2>Create a new task</h2>
          <p>
            Add a task to your workspace and stay productive.
          </p>
        </div>

        <form onSubmit={handleAddTodo}>
          <div className="form-group">
            <label>Task name</label>

            <input
              type="text"
              placeholder="Enter task name..."
              value={taskName}
              className={errors.taskName ? "input-error" : ""}
              onChange={(e) => {
                setTaskName(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  taskName: "",
                }));
              }}
            />

            {errors.taskName && (
              <p className="error-message">
                {errors.taskName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Describe your task..."
              rows="3"
              value={description}
              className={
                errors.description ? "input-error" : ""
              }
              onChange={(e) => {
                setDescription(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  description: "",
                }));
              }}
            />

            {errors.description && (
              <p className="error-message">
                {errors.description}
              </p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="submit"
              className="add-btn"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "+ Add Task"}
            </button>
          </div>
        </form>
      </section>

      {/* Tasks Section */}
      <section className="tasks-section">
        <div className="tasks-heading">
          <div>
            <h2>Your Tasks</h2>
            <p>
              Manage and track your daily activities.
            </p>
          </div>

          <div className="task-controls">
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Tasks</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">
                Not Completed
              </option>
            </select>

            <button
              type="button"
              className="hide-all-btn"
              onClick={() =>
                setHideAllTasks((prev) => !prev)
              }
            >
              {hideAllTasks ? "👁 Show Tasks" : "🙈 Hide All"}
            </button>
          </div>
        </div>

        {/* API Error */}
        {error && (
          <p className="error-message">{error}</p>
        )}

        {/* Todo List */}
        <div className="todo-list">
          {loading ? (
            <div className="empty-state">
              <h3>Loading tasks...</h3>
              <p>Please wait.</p>
            </div>
          ) : hideAllTasks ? (
            <div className="empty-state">
              <div className="empty-icon">👁</div>

              <h3>Tasks are hidden</h3>

              <p>
                Your tasks are safe. Show them whenever you want.
              </p>

              <button
                type="button"
                className="add-btn"
                onClick={() => setHideAllTasks(false)}
              >
                Show Tasks
              </button>
            </div>
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
                onStatusChange={onStatusChange}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>

              <h3>
                {safeTodos.length === 0
                  ? "No tasks yet"
                  : "No matching tasks"}
              </h3>

              <p>
                {safeTodos.length === 0
                  ? "Start by creating your first task."
                  : "Try selecting a different filter."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
