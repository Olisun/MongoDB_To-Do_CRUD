$(document).ready(function () {
  const display = $("#display");
  const form = $("#form");
  const todoUserInput = $("#todoUserInput");
  const message = $("#message");
});

// Helper functions. 
// Clears todo input field.
const resetTodosInput = () => {
  todoUserInput.val("");
}

// Creates unique ID's to attach to the HTML elements.
const buildIDs = (todos) => {
  return {
    editID: `edit_ ${todo._id}`,
    deleteID: `delete_ ${todo._id}`,
    listItemID: `listItem_ ${todo._id}`,
    todoID: `todo_ ${todo._id}`
  }
}

// Builds a template for the list item that gets appended to the list. 
const buildTemplate = (todo, ids) => {
  return `<li class="list-group-item id="${ids.listItemID}">
            <div class="row">
              <div class="col-md-4" id="${ids.todoID}">${todo.todo}</div>
              <div class="col-md-4"></div>
              <div class="col-md-4 text-right">
                <button type="button" class="btn btn-secondary" id="${id.editID}">Edit</button>
                <button type="button" class="btn btn-danger" id="${id.deleteID}">Delete</button>
              </div>
            </div>
          </li>`;
}

// Displays todos to the user. 
const displayTodos = (data) => {
  data.forEach(todo => {
    let ids = buildIDs(todo);
    display.append(buildTemplate(todo, ids));
    editTodo(todo, ids.todoID, ids.editID);
    deleteTodo(todo, ids.listItemID, ids.deleteID);
  });
}