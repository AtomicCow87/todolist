$(document).ready(function(){
  var sort = 0;

  var getAndDisplayAllTasks = function (sort) {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=207',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          if (sort == 1) {
            if (task.completed == false) {
              $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            }
          } else if (sort == 2) {
            if (task.completed == true) {
              $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            }
          } else {
            $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
          }
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=207',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks(sort);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }
  
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=207',
      success: function (response, textStatus) {
        getAndDisplayAllTasks(sort);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  var markTaskComplete = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=207',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks(sort);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markTaskComplete($(this).data('id'));
     } else {
       markTaskActive($(this).data('id'));
     }
   });

   var markTaskActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=207',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks(sort);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '#sort-all', function () {
    sort = 0;
    getAndDisplayAllTasks(sort);
  });

  $(document).on('click', '#sort-active', function () {
    sort = 1;
    getAndDisplayAllTasks(sort);
  });

  $(document).on('click', '#sort-completed', function () {
    sort = 2;
    getAndDisplayAllTasks(sort);
  });

  getAndDisplayAllTasks(sort);
  
});