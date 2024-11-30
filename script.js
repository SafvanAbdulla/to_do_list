const taskInput=document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
const today = new Date().toISOString().split('T')[0];

const saveTask=()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks));
};

const displayTaskList = () => {

  taskList.innerHTML = '';
  const todayArr = tasks.filter(task => task.date === today);
  const due = tasks.filter(task => task.date < today);
  const upcoming = tasks.filter(task => task.date > today);

  if(due.length){
    const dueHead = document.createElement('h2');
    dueHead.textContent = 'Due Tasks';
    taskList.appendChild(dueHead);
    due.forEach(task => displaySingleTask(task));
  }
  
  if(upcoming.length){
    const upHead = document.createElement('h2');
    upHead.textContent = 'Upcoming Tasks';
    taskList.appendChild(upHead);
    upcoming.forEach(task => displaySingleTask(task));
  }
}
 const displaySingleTask = task => {
  const taskDiv = document.createElement('div');
  const currentTaskDate = task.date;
  taskDiv.classList.add('task');
  taskDiv.innerHTML = `
    <span class ="currentTaskDate">${currentTaskDate}<br></span>
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
  console.log(taskDate);
  if (!description || !date || !time) {
    alert('Please fill in all fields ');
    return;
  }


  const newTask = { description, date, time };
  tasks.push(newTask);
  saveTask();
  displayTaskList();

  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
};

const editTask = task => {
  const newDescription = prompt('Edit task description:', task.description);
  if (newDescription) {
    task.description = newDescription;
    saveTask();
    displayTaskList();
  }
};

const deleteTask = task => {
  tasks = tasks.filter(t => t !== task);
  saveTask();
  displayTaskList();
};

addTaskButton.addEventListener('click', addTask);
displayTaskList();
