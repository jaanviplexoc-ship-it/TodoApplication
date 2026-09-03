using TodoApp.Api.Models;

namespace TodoApp.Api.Repositories;

public interface ITodoRepository
{
    Task<List<Todo>> GetAllAsync();

    Task<Todo?> GetByIdAsync(int id);

    Task<Todo> CreateAsync(Todo todo);

    Task<Todo?> UpdateAsync(int id, Todo todo);

    Task<bool> DeleteAsync(int id);
}