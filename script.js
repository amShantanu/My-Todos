
document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.querySelector('input[placeholder="What You Decided?"]');
  const descInput = document.querySelector('input[placeholder="And How Will You Do?"]');
  const addButton = document.querySelector('.prmaryBtn');
  const todoList = document.querySelector('.todo-list');
  const [todoBtn, completedBtn] = document.querySelectorAll('.secondaryBtn');
  
  let todos = [];
  let isCompleted = false;
  
  addButton.addEventListener('click', () => {
    if (titleInput.value && descInput.value) {
      const todo = {
        id: Date.now(),
        title: titleInput.value,
        description: descInput.value,
        completed: false
      };
      todos.push(todo);
      titleInput.value = '';
      descInput.value = '';
      renderTodos();
    }
  });

  todoBtn.addEventListener('click', () => {
    isCompleted = false;
    todoBtn.classList.add('active');
    completedBtn.classList.remove('active');
    renderTodos();
  });

  completedBtn.addEventListener('click', () => {
    isCompleted = true;
    completedBtn.classList.add('active');
    todoBtn.classList.remove('active');
    renderTodos();
  });

  function renderTodos() {
    const filteredTodos = todos.filter(todo => todo.completed === isCompleted);
    todoList.innerHTML = filteredTodos.map(todo => `
      <div class="todo-list-items">
        <div>
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
        </div>
        <div class="icons">
          <span class="delete-icon" onclick="deleteTodo(${todo.id})" title="Delete task">❌</span>
          <span class="check-icon" onclick="toggleTodo(${todo.id})" title="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">${todo.completed ? '↩️' : '✅'}</span>
        </div>
      </div>
    `).join('');
  }

  window.deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  };

  window.toggleTodo = (id) => {
    todos = todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
  };

  todoBtn.classList.add('active');
  renderTodos();
});
