import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TodoList({
  todos = [],
  loading = false,
  onToggleTodo,
  onDeleteTodo,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const statusFromUrl = searchParams.get("status");

  const activeFilter =
    statusFromUrl === "pending" || statusFromUrl === "completed"
      ? statusFromUrl
      : "all";

  const filteredTodos = useMemo(() => {
    if (activeFilter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    if (activeFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, activeFilter]);

  const handleFilterChange = (filter) => {
    if (filter === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      status: filter,
    });
  };

  const handleTodoClick = async (todoId) => {
    setActionError(null);

    try {
      await onToggleTodo(todoId);
    } catch (err) {
      setActionError(err.message || "Failed to update task status.");
    }
  };

  // Open edit page

  const handleEditStart = (todo) => {
    navigate(`/TodoForm?edit=${todo.id}`);
  };

  // Open delete confirmation

  const handleDeleteStart = (todoId) => {
    setDeleteTodoId(todoId);
  };

  // Confirm delete

  const handleDeleteConfirm = async () => {
    if (deleteTodoId === null) {
      return;
    }

    setActionError(null);

    try {
      await onDeleteTodo(deleteTodoId);
    } catch (err) {
      setActionError(err.message || "Failed to delete task.");
    } finally {
      setDeleteTodoId(null);
    }
  };

  // Cancel delete

  const handleDeleteCancel = () => {
    setDeleteTodoId(null);
  };

  return (
    <div className="todo-list-page">
      <div className="todo-list-header">
        <h1>My Tasks</h1>

        <p>Manage Your Tasks And Track your Progress.</p>
      </div>

      {actionError && <div className="form-error">{actionError}</div>}

      {/* Filters */}

      <div className="todo-filters">
        <label htmlFor="task-filter">Filter Tasks</label>

        <select
          id="task-filter"
          value={activeFilter}
          onChange={(event) => handleFilterChange(event.target.value)}
        >
          <option value="all">All</option>

          <option value="pending">Pending</option>

          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task Count */}

      <div className="todo-list-summary">
        <span>
          Showing {filteredTodos.length} task
          {filteredTodos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Loading state */}

      {loading ? (
        <div className="loading-state">
          <p>Loading tasks...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-todo-state">
          <h2>No Tasks Found</h2>

          <p>There are no tasks in this category.</p>
        </div>
      ) : (
        <div className="todo-table-container">
          <table className="todo-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTodos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className={todo.completed ? "completed" : ""}
                >
                  {/* ID */}

                  <td className="todo-id">{index + 1}</td>

                  {/* Title */}

                  <td className="todo-title">{todo.text}</td>

                  {/* Description */}

                  <td className="todo-description">
                    {todo.description || "No description"}
                  </td>

                  {/* Status */}

                  <td className="todo-status">
                    <div className="status-wrapper">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleTodoClick(todo.id)}
                        aria-label={`Mark "${todo.text}" as ${
                          todo.completed ? "pending" : "completed"
                        }`}
                      />

                      <span>
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}

                  <td className="todo-actions">
                    <button
                      type="button"
                      onClick={() => handleEditStart(todo)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteStart(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}

      {deleteTodoId !== null && (
        <div className="delete-modal-backdrop">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <h2 id="delete-modal-title">Delete Task?</h2>

            <p>
              Are you sure you want to delete this task? This action cannot
              be undone.
            </p>

            <div className="delete-modal-actions">
              <button type="button" onClick={handleDeleteCancel}>
                Cancel
              </button>

              <button type="button" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
