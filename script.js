//Adding a new task function
function addTask() {
    let taskTitle = document.getElementById('taskTitle').value;
    let dueDate = document.getElementById('dueDate').value;

    if (taskTitle.trim() === '' || dueDate === '') {
        alert('Please enter a task title and due date');
        return;
    }
    let task = {
        title: taskTitle,
        dueDate: dueDate,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}


//Display task Function
function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        let taskItem = document.createElement('li');
        taskItem.textContent = `${task.title} - Due date: ${task.dueDate}`;
        
        //Editing task button
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            console.log('Edit button clicked!');  
            editTask(index);
        }); 

        //Deleting task button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        //Checkbox for marking a task as complete
        let completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = task.completed;
        completeCheckbox.addEventListener('change', () => toggleComplete(index));
        taskItem.appendChild(completeCheckbox);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}


//Edit a task function
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let updatedTitle = prompt('Enter new title for the task');
    let updatedDueDate = prompt('Enter new due date for the task');
    
    if (updatedTitle && updatedDueDate) {
        let updatedTask = {
            title: updatedTitle,
            dueDate: updatedDueDate,
            completed: tasks[index].completed
        };
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

//Delete a task function
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

//Mark a task as complete function
function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

//Event listener for adding a new task
document.getElementById('addTaskBtn').addEventListener('click', addTask);

//Display of tasks
displayTasks();