// Shape reference only. The real `id` is assigned by the server (EF Core)
// once a todo is created via POST — it is intentionally NOT generated here.
function TodoModel(text, description) {
  return {
    text,
    description,
    completed: false,
  };
}

export default TodoModel;
