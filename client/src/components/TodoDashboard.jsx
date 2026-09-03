import { useNavigate } from "react-router-dom";

function TodoDashboard({ todos = [], loading = false }) {
  const navigate = useNavigate();

  const totalTasks = todos.length;

  const pendingTasks = todos.filter((todo) => !todo.completed).length;

  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-dashboard">
      <div className="dashboard-header">
        <h1>My ToDo Application</h1>
        <p>
          Welcome to the ToDo Application! This application allows you to
          manage your tasks efficiently. You can add new tasks, view your
          task list, and mark tasks as completed. Stay organized and boost
          your productivity with this simple yet effective ToDo application.
        </p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="dashboard-stats">
          <div
            className="stat-card"
            onClick={() => navigate("/TodoList?status=all")}
          >
            <h3>Total Tasks</h3>
            <span>{totalTasks}</span>
          </div>

          <div
            className="stat-card-clickable"
            onClick={() => navigate("/TodoList?status=pending")}
          >
            <h3>Pending tasks</h3>
            <span>{pendingTasks}</span>
          </div>

          <div
            className="stat-card-clickable"
            onClick={() => navigate("/TodoList?status=completed")}
          >
            <h3>Completed Tasks</h3>
            <span>{completedTasks}</span>
          </div>
        </div>
      )}

      <div className="btn">
        <button
          className="add-todo-btn"
          onClick={() => navigate("/TodoForm")}
        >
          Add ToDo
        </button>
      </div>
    </div>
  );
}

export default TodoDashboard;
