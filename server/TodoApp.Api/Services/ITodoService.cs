using TodoApp.Api.DTOs;

namespace TodoApp.Api.Services;

public interface ITodoService
{
    Task<List<TodoDto>> GetAllAsync();

    Task<TodoDto?> GetByIdAsync(int id);

    Task<TodoDto> CreateAsync(CreateTodoDto dto);

    Task<TodoDto?> UpdateAsync(int id, UpdateTodoDto dto);

    Task<bool> DeleteAsync(int id);
}