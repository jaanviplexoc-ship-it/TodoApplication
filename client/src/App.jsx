import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoDashboard from "./components/TodoDashboard";

import { useTodos } from "./hooks/useTodos";

import "./app.css";

function App() {
    const {
        todos,
        loading,
        error,
        addTodo,
        editTodo,
        toggleTodo,
        deleteTodo,
    } = useTodos();

    return (
        <div>
            <Navbar />

            {error && (
                <div className="global-error">
                    {error}
                </div>
            )}

            <Routes>
                <Route
                    path="/"
                    element={
                        <TodoDashboard
                            todos={todos}
                            loading={loading}
                        />
                    }
                />

                <Route
                    path="/TodoForm"
                    element={
                        <TodoForm
                            todos={todos}
                            onAddTodo={addTodo}
                            onEditTodo={editTodo}
                        />
                    }
                />

                <Route
                    path="/TodoList"
                    element={
                        <TodoList
                            todos={todos}
                            loading={loading}
                            onToggleTodo={toggleTodo}
                            onDeleteTodo={deleteTodo}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;