using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Todo>> GetAllAsync()
    {
        return await _context.Todos.ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(int id)
    {
        return await _context.Todos.FindAsync(id);
    }

    public async Task<Todo> CreateAsync(Todo todo)
    {
        _context.Todos.Add(todo);

        await _context.SaveChangesAsync();

        return todo;
    }

    public async Task<Todo?> UpdateAsync(int id, Todo todo)
    {
        var existingTodo = await _context.Todos.FindAsync(id);

        if (existingTodo == null)
        {
            return null;
        }

        existingTodo.Text = todo.Text;
        existingTodo.Description = todo.Description;
        existingTodo.Completed = todo.Completed;

        await _context.SaveChangesAsync();

        return existingTodo;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existingTodo = await _context.Todos.FindAsync(id);

        if (existingTodo == null)
        {
            return false;
        }

        _context.Todos.Remove(existingTodo);

        await _context.SaveChangesAsync();

        return true;
    }
}