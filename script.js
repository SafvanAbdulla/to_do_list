const taskInput=document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('tasktime');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const errorMessage = document.getElementById('errorMessage');

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];

const saveTask=()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks));
};

const displayTaskList = () => {
  const today = new Date().toISOString().split('T')[0];
  const due = tasks.filter(task => task.date < today);
  const todayArr = tasks.filter(task => task.date === today);
  const upcoming = tasks.filter(task => task.date > today);

  if(due.length){
    const dueHead = document.createElement('h2');
    dueHead.textContent = 'Due Tasks';
    taskList.appendChild(dueHead);
    due.forEach(task => displaySingleTask(task));
  }

  if(todayArr.length){
    const todayHead = document.createElement('h2');
    dueHead.textContent = 'Today';
    taskList.appendChild(todayHead);
    todayArr.forEach(task => displaySingleTask(task));
  }

  if(upcoming.length){
    const upHead = document.createElement('h2');
    dueHead.textContent = 'Upcoming Tasks';
    taskList.appendChild(upHead);
    due.forEach(task => displaySingleTask(task));
  }

 const displaySingleTask = task => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.innerHTML = `
    <span>${task.description} - ${task.time}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;
  taskDiv.querySelector('.edit').addEventListener('click', () => editTask(task));
  taskDiv.querySelector('.delete').addEventListener('click', () => deleteTask(task));
  taskList.appendChild(taskDiv);
};

const addTask =()=>{
  const description = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (description && date && time) {
    errorMessage.textContent = 'Please fill in all fields';
    errorMessage.style.display = 'block';
    return;
  }

errorMessage.style.display = 'none';

  const newTask = { description, date, time };
  tasks.push(newTask);
  saveTasks();
  displayTaskList();

  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
};

const editTask = task => {
  const newDescription = prompt('Edit task description:', task.description);
  if (newDescription) {
    task.description = newDescription;
    saveTasks();
    displayTaskList();
  }
};

const deleteTask = task => {
  tasks = tasks.filter(t => t !== task);
  saveTasks();
  displayTaskList();
};

addTaskButton.addEventListener('click', addTask);
displayTaskList();
}
