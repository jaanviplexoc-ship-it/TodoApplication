import { useState, useEffect, useCallback } from "react";
import * as todoApi from "../api/todoApi";

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GET Todos

    const fetchTodos = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await todoApi.getTodos();

            setTodos(data);
        } catch (err) {
            setError(err.message || "Failed to load todos.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // POST Todo

    const addTodo = useCallback(async (text, description) => {
        setError(null);

        try {
            const newTodo = await todoApi.createTodo({
                text,
                description,
                completed: false,
            });

            setTodos((previousTodos) => [
                ...previousTodos,
                newTodo,
            ]);

            return newTodo;
        } catch (err) {
            setError(err.message || "Failed to create todo.");

            throw err;
        }
    }, []);

    // PUT Todo - Edit

    const editTodo = useCallback(
        async (todoId, updatedText, updatedDescription) => {
            const currentTodo = todos.find(
                (todo) => todo.id === todoId
            );

            if (!currentTodo) {
                throw new Error("Todo not found.");
            }

            setError(null);

            try {
                const updatedTodo = await todoApi.updateTodo(todoId, {
                    text: updatedText,
                    description: updatedDescription,
                    completed: currentTodo.completed,
                });

                setTodos((previousTodos) =>
                    previousTodos.map((todo) =>
                        todo.id === todoId ? updatedTodo : todo
                    )
                );

                return updatedTodo;
            } catch (err) {
                setError(err.message || "Failed to update todo.");

                throw err;
            }
        },
        [todos]
    );

    // PUT Todo - Toggle Completed

    const toggleTodo = useCallback(
        async (todoId) => {
            const currentTodo = todos.find(
                (todo) => todo.id === todoId
            );

            if (!currentTodo) {
                throw new Error("Todo not found.");
            }

            setError(null);

            try {
                const updatedTodo = await todoApi.updateTodo(todoId, {
                    text: currentTodo.text,
                    description: currentTodo.description,
                    completed: !currentTodo.completed,
                });

                setTodos((previousTodos) =>
                    previousTodos.map((todo) =>
                        todo.id === todoId ? updatedTodo : todo
                    )
                );

                return updatedTodo;
            } catch (err) {
                setError(
                    err.message || "Failed to update todo status."
                );

                throw err;
            }
        },
        [todos]
    );

    // DELETE Todo

    const deleteTodo = useCallback(async (todoId) => {
        setError(null);

        try {
            await todoApi.deleteTodo(todoId);

            setTodos((previousTodos) =>
                previousTodos.filter(
                    (todo) => todo.id !== todoId
                )
            );
        } catch (err) {
            setError(err.message || "Failed to delete todo.");

            throw err;
        }
    }, []);

    return {
        todos,
        loading,
        error,
        addTodo,
        editTodo,
        toggleTodo,
        deleteTodo,
        refetch: fetchTodos,
    };
}