namespace TodoApp.Api.DTOs;

public class UpdateTodoDto
{
    public string Text { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool Completed { get; set; }
}