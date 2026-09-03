import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TodoForm({ todos = [], onAddTodo, onEditTodo }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editTodoId = searchParams.get("edit");

  const isEditMode = editTodoId !== null;

  const todoToEdit = todos.find(
        (todo) => String(todo.id) === String(editTodoId)
  );

  const isCompletedTodo = todoToEdit?.completed === true;
  
  const [todoText, setTodoText] = useState(() => todoToEdit?.text || "");
  const [todoDescription, setTodoDescription] = useState(() => todoToEdit?.description || "");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);


  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedText = todoText.trim();
    const trimmedDescription = todoDescription.trim();

    // Don't allow empty todo

    if (!trimmedText) {
      alert("Don't allow empty Todo !!");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      // Edit existing todo

      if (isEditMode) {
        const updatedDescription = isCompletedTodo
          ? todoToEdit.description
          : trimmedDescription;

        await onEditTodo(Number(editTodoId), trimmedText, updatedDescription);

        navigate("/TodoList");
        return;
      }

      // Create new todo

      await onAddTodo(trimmedText, trimmedDescription);

      // Clear form

      setTodoText("");
      setTodoDescription("");
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="todo-form-page">
      <div className="todo-form-header">
        <h1>{isEditMode ? "Edit Todo" : "Add Todo"}</h1>

        <p>
          {isEditMode
            ? "Update your task and keep your work organized."
            : "Create a new task and keep your work organized."}
        </p>
      </div>

      {formError && <div className="form-error">{formError}</div>}

      <form className="todo-form" onSubmit={handleSubmit}>
        {/* Title */}

        <div className="form-group">
          <label htmlFor="formText">Task</label>

          <input
            id="formText"
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter your todo..."
          />
        </div>

        {/* Description */}

        <div className="form-group">
          <label htmlFor="formDescription">Description</label>

          <textarea
            id="formDescription"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            placeholder="Describe your task..."
            rows="6"
            disabled={isCompletedTodo}
          />
        </div>

        <button type="submit" className="add-todo-btn" disabled={submitting}>
          {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
