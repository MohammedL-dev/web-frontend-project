// DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const tasksCount = document.getElementById('tasks-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');

// Tasks
let tasks = [];

// Load tasks 
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateTasksCount();
});

// Save tasks 
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

// new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const newTask = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    tasks.push(newTask);
    saveTasks();
    
    taskInput.value = '';
    renderTasks();
    updateTasksCount();
});

// Render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.id = task.id;
        
        if (task.editing) {
            const editForm = document.createElement('form');
            editForm.classList.add('edit-form');
            
            const editInput = document.createElement('input');
            editInput.classList.add('edit-input');
            editInput.type = 'text';
            editInput.value = task.text;
            editInput.autocomplete = 'off';
            
            const saveBtn = document.createElement('button');
            saveBtn.classList.add('save-btn');
            saveBtn.textContent = '✓';
            saveBtn.type = 'submit';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.classList.add('cancel-btn');
            cancelBtn.textContent = '✗';
            cancelBtn.type = 'button';
            
            editForm.appendChild(editInput);
            editForm.appendChild(saveBtn);
            editForm.appendChild(cancelBtn);
            
            taskItem.appendChild(editForm);
            
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const updatedText = editInput.value.trim();
                if (updatedText !== '') {
                    updateTaskText(task.id, updatedText);
                }
            });
            
            cancelBtn.addEventListener('click', () => {
                cancelEditTask(task.id);
            });
            
            // Focus on the input field when editing
            setTimeout(() => {
                editInput.focus();
            }, 0);
        } else {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.completed;
            
            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            if (task.completed) {
                taskText.classList.add('completed');
            }
            taskText.textContent = task.text;
            
            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');
            
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.innerHTML = '✎';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '×';
            
            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(taskActions);
            
            // Toggle task completion
            checkbox.addEventListener('change', () => {
                toggleTaskCompletion(task.id);
            });
            
            // Edit task
            editBtn.addEventListener('click', () => {
                startEditTask(task.id);
            });
            
            // Delete task
            deleteBtn.addEventListener('click', () => {
                deleteTask(task.id);
            });
        }
        
        taskList.appendChild(taskItem);
    });
}

// Toggle task completion
function toggleTaskCompletion(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
        updateTasksCount();
    }
}

// Start editing a task
function startEditTask(id) {
    tasks = tasks.map(task => ({
        ...task,
        editing: task.id === id
    }));
    
    renderTasks();
}

// Update task text
function updateTaskText(id, newText) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        tasks[taskIndex].editing = false;
        saveTasks();
        renderTasks();
    }
}

// Cancel editing a task
function cancelEditTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].editing = false;
        renderTasks();
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateTasksCount();
}

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateTasksCount();
});

// chek all
clearAllBtn.addEventListener( 'click' , () => {
    const allCompleted = tasks.every(task => task.completed);
    
    tasks = tasks.map(task => ({
        ...task,
        completed: !allCompleted
    }));
    
    saveTasks();
    renderTasks();
    updateTasksCount();
});

// Update  count
function updateTasksCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    
    tasksCount.textContent = `${remainingTasks} of ${totalTasks} tasks remaining`;
}