
document.addEventListener('DOMContentLoaded', () => {
  // Theme handling
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`${savedTheme}-mode`);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    body.classList.remove(isDark ? 'dark-mode' : 'light-mode');
    body.classList.add(isDark ? 'light-mode' : 'dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
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

  function updateButtonCounts() {
    const completedCount = todos.filter(todo => todo.completed).length;
    const todoCount = todos.filter(todo => !todo.completed).length;
    todoBtn.textContent = `Todo ${todoCount}`;
    completedBtn.textContent = `Completed ${completedCount}`;
  }

  function renderTodos() {
    const filteredTodos = todos.filter(todo => todo.completed === isCompleted);
    updateButtonCounts();
    todoList.innerHTML = filteredTodos.map(todo => `
      <div class="todo-list-items">
        <div>
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
        </div>
        <div class="icons">
          <span class="delete-icon" onclick="deleteTodo(${todo.id})">🗑️</span>
          <span class="check-icon" onclick="toggleTodo(${todo.id})">✓</span>
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
  updateButtonCounts();
  renderTodos();
});
