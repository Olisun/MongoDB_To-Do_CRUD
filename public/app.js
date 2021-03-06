$(document).ready(function () {
  const display = $("#display");
  const form = $("#form");
  const todoUserInput = $("#todoUserInput");
  const message = $("#message");

  // Helper functions. 
  // Clears todo input field.
  const resetTodosInput = () => {
    todoUserInput.val("");
  }

  // Creates unique ID's to attach to the HTML elements.
  const buildIDs = (todo) => {
    return {
      editID: `edit_${todo._id}`,
      deleteID: `delete_${todo._id}`,
      listItemID: `listItem_${todo._id}`,
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
                <button type="button" class="btn btn-secondary" id="${ids.editID}">Edit</button>
                <button type="button" class="btn btn-danger" id="${ids.deleteID}">Delete</button>
              </div>
            </div>
          </li>`;
  }

  // GET / EDIT / DELETE / POST
  const getTodos = () => {
    fetch("/getTodos", {
      method: "GET",
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      displayTodos(data);
    });
  }

  getTodos();

  // Displays todos to the user. 
  const displayTodos = (data) => {
    data.forEach(todo => {
      let ids = buildIDs(todo);
      display.append(buildTemplate(todo, ids));
      editTodo(todo, ids.todoID, ids.editID);
      deleteTodo(todo, ids.listItemID, ids.deleteID);
    });
  }

  const deleteTodo = (todo, listItemID, deleteID) => {
    let deleteButton = $(`#${deleteID}`);
    deleteButton.click(() => {
      fetch(`/${todo._id}`, {
        method: "DELETE",
      }).then(response => {
        return response.json();
        console.log(response);
      }).then(data => {
        console.log(data);
        if (data.ok == 1) {
          $(`#${listItemID}`).remove();
        }
      });
    });
  }

  const editTodo = (todo, todoID, editID) => {
    let editButton = $(`#${editID}`);
    editButton.click(() => {
      fetch(`/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          todo: todoUserInput.val().trim()
        })
      }).then(response => {
        return response.json();
      }).then(data => {
        if (data.ok == 1) {
          let todoIndex = $(`#${todo._id}`);
          todoIndex.html(data.value.todo);
          resetTodosInput();
        }
      })
    })
  }


  form.submit(event => {
    event.preventDefault();
    fetch("/", {
      method: "POST",
      body: JSON.stringify({
        todo: todoUserInput.val().trim()
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(resposne => {
      return response.json();
    }).then(data => {
      console.log("data");
      if (!data.error) {
        if (data.result.ok == 1 && data.result.n == 1) {
          let ids = buildIDs(data.document);
          display.append(buildTemplate(data.document.ids));
          editTodo(data.document, ids.todoID, ids.editID);
          deleteTodo(data.document, ids.listItemID, ids.deleteID);
          displayMessage(true, data.msg);
        }
      } else {
        displayMessage(false, data.error.message);
        resetTodosInput();
      }
    })
  })
});

