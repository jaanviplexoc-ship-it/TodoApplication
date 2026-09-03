using TodoApp.Api.DTOs;
using TodoApp.Api.Models;
using TodoApp.Api.Repositories;

namespace TodoApp.Api.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;

    public TodoService(ITodoRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TodoDto>> GetAllAsync()
    {
        var todos = await _repository.GetAllAsync();

        return todos.Select(todo => new TodoDto
        {
            Id = todo.Id,
            Text = todo.Text,
            Description = todo.Description,
            Completed = todo.Completed
        }).ToList();
    }

    public async Task<TodoDto?> GetByIdAsync(int id)
    {
        var todo = await _repository.GetByIdAsync(id);

        if (todo == null)
        {
            return null;
        }

        return new TodoDto
        {
            Id = todo.Id,
            Text = todo.Text,
            Description = todo.Description,
            Completed = todo.Completed
        };
    }

    public async Task<TodoDto> CreateAsync(CreateTodoDto dto)
    {
        var todo = new Todo
        {
            Text = dto.Text.Trim(),
            Description = dto.Description?.Trim(),
            Completed = false
        };

        var createdTodo = await _repository.CreateAsync(todo);

        return new TodoDto
        {
            Id = createdTodo.Id,
            Text = createdTodo.Text,
            Description = createdTodo.Description,
            Completed = createdTodo.Completed
        };
    }

    public async Task<TodoDto?> UpdateAsync(int id, UpdateTodoDto dto)
    {
        var todo = new Todo
        {
            Text = dto.Text.Trim(),
            Description = dto.Description?.Trim(),
            Completed = dto.Completed
        };

        var updatedTodo = await _repository.UpdateAsync(id, todo);

        if (updatedTodo == null)
        {
            return null;
        }

        return new TodoDto
        {
            Id = updatedTodo.Id,
            Text = updatedTodo.Text,
            Description = updatedTodo.Description,
            Completed = updatedTodo.Completed
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}