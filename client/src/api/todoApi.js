const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(response) {
    if (!response.ok) {
        const message = await response.text();

        throw new Error(
            message || `Request failed with status ${response.status}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function getTodos() {
    const response = await fetch(`${BASE_URL}/todos`);

    return handleResponse(response);
}

export async function createTodo(todo) {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    return handleResponse(response);
}

export async function updateTodo(id, todo) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    return handleResponse(response);
}

export async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response);
}