namespace TodoApp.Api.Models;

public class Todo
{
    public int Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool Completed { get; set; }
}