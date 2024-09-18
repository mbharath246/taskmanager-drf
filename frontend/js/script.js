let sideNavBar = document.getElementById('side-btn')
let sideActive = document.querySelector('aside')
let time = document.getElementById('time')
const mainBody = document.querySelector('.main-body')
const days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let allTasksData;
let userName;
const userNameAdd = sideActive.querySelector('.grid .name p')

const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!isLoggedIn){
    window.location.href = '/frontend/login.html'
}


sideNavBar.addEventListener('click', () => {
    sideActive.classList.toggle('active')
    let s = sideActive.querySelector('.swipe-head i')
    if (sideActive.classList.contains('active')){
        s.classList.add('fa-bars')
        s.classList.remove('fa-xmark')

    }
    else{
        s.classList.remove('fa-bars')
        s.classList.add('fa-xmark')

    }
})

function formatDate() {
    const date = new Date()
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    const year = date.getFullYear();

    time.innerHTML = `${day} ${month}, ${year}, ${strTime}`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(formatDate, 100)
})

// baseUrl = 'https://taskmanager-drf.onrender.com/'
baseUrl = 'http://localhost:8000/'


document.body.onload = function (){

    taskUrl = baseUrl + 'tasks/'
    const options = {
        method : 'GET',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Authorization' : localStorage.getItem('token')
        }
    }
    fetch(taskUrl, options)
    .then(response => {
        if (response.ok) {
        return response.json(); // or response.text() for plain text
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        allTasksData = data
        localStorage.setItem('user',data[0].user)
        userNameAdd.innerHTML = localStorage.getItem('user')    
        getTasks(data); // Process the data here
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

function getTasks(data){
    if (mainBody){
        mainBody.innerHTML = ''
        data.forEach(element => {
            let ul = document.createElement('ul')
            ul.classList.add('main-content')
            let dateFormat = new Date(element.task_date)
            let day = days[dateFormat.getDay()]
            let mon = months[dateFormat.getMonth()]
            let date = dateFormat.getDate()
            let year = dateFormat.getFullYear()
            let taskDate = `${day}, ${date} ${mon}, ${year}`
            
            ul.innerHTML = `
            <li>${element.id}</li>
            <li id="task">${element.name}</li>
            <li id="desc">${element.description}</li>
            <li id="status">${element.status}</li>
            <li id="date">${taskDate}</li>
            <li id="edit-container">
            <button id="task-edit" onclick="editTask(${element.id})"><i class="fa-solid fa-pencil"></i>edit</button>
            <button id="delete-task" onclick="deleteTask(${element.id})" ><i class="fa-solid fa-trash"></i></button>
            </li>
            `
            
            if (element.status === 'Success') {
                let statusElement = ul.querySelector('#status');
                statusElement.style.background = 'green';
            }
            mainBody.append(ul)
        });
    }
}


const filter = document.querySelector('.filter select')

if (filter){
    filter.addEventListener('click', () => {
        if (filter.value === 'Pending'){
            const data = allTasksData.filter(data => data.status.includes(filter.value))
            getTasks(data)
        }else if (filter.value === 'Success'){
            const data = allTasksData.filter(data => data.status.includes(filter.value))
            getTasks(data)
        }
        else{
            getTasks(allTasksData)
        }
    })
}

const search = document.querySelector('header .search #search-value')

if (search){
    search.addEventListener('input', () => {
        const data = allTasksData.filter(data => {
            return data.name.toLowerCase().includes(search.value.toLowerCase())
        })
        getTasks(data)
    })
}

let taskId;
function deleteYes(){
    let deleteContainer = document.querySelector('.delete-container')
    deleteContainer.style.display = 'none';
    deleteTaskMain()
    mainBody.style.display = 'block';
}

function deleteNo(){
    
    let deleteContainer = document.querySelector('.delete-container')
    deleteContainer.style.display = 'none';
    mainBody.style.display = 'block';

}

function deleteTask(task){
    taskId = task
    let deleteContainer = document.querySelector('.delete-container')
    deleteContainer.style.display = 'block';
    mainBody.style.display = 'none';
}

function deleteTaskMain(){
    console.log(taskId);
    deleteUrl = `${baseUrl}tasks/${taskId}/`

    let options = {
        method:'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    
    fetch(deleteUrl, options)
    .then(res => {
        if (res.ok){
            return res.text()
        }
        else{
            return res.json()
        }
    })
    .then(data => {
        if (data){
            console.log(data);
        }
        else{
            console.log('Task deleted Successfully');
            location.reload()
        }
    })
    .catch(err => console.log(err))
}



const addTask = document.querySelector('.add-task')
if (addTask){
    addTask.addEventListener('submit',(event) => {
        event.preventDefault()
        const taskObject = new FormData(addTask)
        const taskValues = Object.fromEntries(taskObject)
        
        let addTaskUrl = `${baseUrl}tasks/`
        let options = {
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                'Accept':'application/json',
                'Authorization':localStorage.getItem('token')
            },
            body:JSON.stringify(taskValues)
        }
        console.log(addTaskUrl, options);
        
        fetch(addTaskUrl, options)
        .then(res => res.json())
        .then(data => location.reload())
        .catch(err => console.log(err))
    })
}



let editTaskValue;

function populateTaskForm(taskData) {
    document.querySelector('#task-name-edit').value = taskData.name;
    document.querySelector('#task-desc-edit').value = taskData.description;

    if (taskData.status === 'Success') {
        document.querySelector('#status-success-edit').checked = true;
    } else if (taskData.status === 'Pending') {
        document.querySelector('#status-pending-edit').checked = true;
    }
    console.log(taskData.name);
}

function fetchTaskData(taskId) {
    let taskUrl = `${baseUrl}tasks/${taskId}/`;

    fetch(taskUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => populateTaskForm(data))
    .catch(err => console.log(err));
}


function editTask(value){
    editTaskValue = value
    document.getElementById('edit-container').style.display = 'flex';
    mainBody.style.display = 'none';
    fetchTaskData(value)
}

const editTaskMain = document.getElementById('edit-tasks')
if (editTaskMain){
    editTaskMain.addEventListener('submit',(event) => {
        event.preventDefault()
        const taskObject = new FormData(editTaskMain)
        const taskValues = Object.fromEntries(taskObject)
        
        let editTaskMainUrl = `${baseUrl}tasks/${editTaskValue}/`
        let options = {
            method:'PUT',
            headers: {
                'Content-Type':"application/json",
                'Accept':'application/json',
                'Authorization':localStorage.getItem('token')
            },
            body:JSON.stringify(taskValues)
        }
        console.log(editTaskMainUrl, options);
        
        fetch(editTaskMainUrl, options)
        .then(res => res.json())
        .then(data => location.reload())
        .catch(err => console.log(err))
    })
}


function editTasksClose(){
    document.getElementById('edit-container').style.display = 'none';
    mainBody.style.display = 'block';
}



function logOut() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    window.location.href = '/frontend/login.html'
}