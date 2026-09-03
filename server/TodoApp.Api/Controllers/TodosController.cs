using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.DTOs;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoDto>>> GetTodos()
    {
        var todos = await _todoService.GetAllAsync();

        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDto>> GetTodo(int id)
    {
        var todo = await _todoService.GetByIdAsync(id);

        if (todo == null)
        {
            return NotFound(new
            {
                message = $"Todo with id {id} was not found."
            });
        }

        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<TodoDto>> CreateTodo(
        CreateTodoDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Text))
        {
            return BadRequest(new
            {
                message = "Todo text is required."
            });
        }

        var createdTodo = await _todoService.CreateAsync(dto);

        return Ok(createdTodo);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoDto>> UpdateTodo(
        int id,
        UpdateTodoDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Text))
        {
            return BadRequest(new
            {
                message = "Todo text is required."
            });
        }

        var updatedTodo = await _todoService.UpdateAsync(id, dto);

        if (updatedTodo == null)
        {
            return NotFound(new
            {
                message = $"Todo with id {id} was not found."
            });
        }

        return Ok(updatedTodo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var deleted = await _todoService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound(new
            {
                message = $"Todo with id {id} was not found."
            });
        }

        return NoContent();
    }
}