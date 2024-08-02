const baseUrl = 'http://localhost:8000'
let loginForm = document.getElementById('form-data')

loginForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    let formData = new FormData(loginForm);
    let loginToken = `${baseUrl}/login/`;
    let formEntries = Object.fromEntries(formData);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formEntries)
    };

    fetch(loginToken, options)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('access',data.access)
            console.log(data);
        })
        .catch(err => console.log(err))

});

// get tasks

function get_tasks(){
    let token = localStorage.getItem('access')
    console.log(token);
    let tasks_url = `${baseUrl}/tasks/`
    let options = {
        headers : {
            'Authorization':'Bearer ' + token
        }
    }
    fetch(tasks_url, options)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for(const i of data){
            console.log(i);
        }
    })
    .catch(err => console.log(err))

}


// create tasks
let taskForm = document.getElementById('task-form')

taskForm.addEventListener("submit", function(event){
    create_tasks()
    event.preventDefault()
})

function create_tasks(){
    let taskData = new FormData(taskForm)
    let taskEntries = Object.fromEntries(taskData)
    let create_url = `${baseUrl}/tasks/`
    const options = {
        method: 'POST',
        headers: {
            'Authorization':'Bearer ' + localStorage.getItem('access'),
            'Content-Type':'application/json'
        },
        body: JSON.stringify(taskEntries)
    }

    fetch(create_url, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}


// update tasks

let updateTask = document.getElementById('update-task')

updateTask.addEventListener("submit", function(event){
    update_task()
    event.preventDefault()
})

function update_task(){
    let taskData = new FormData(updateTask)
    let taskEntries = Object.fromEntries(taskData)
    let create_url = `${baseUrl}/tasks/${taskEntries.number}/`
    console.log(create_url);
    console.log(taskEntries.number);
    console.log(taskEntries, taskData);
    const options = {
        method: 'PUT',
        headers: {
            'Authorization':'Bearer ' + localStorage.getItem('access'),
            'Content-Type':'application/json'
        },
        body: JSON.stringify(taskEntries)
    }
    console.log(options);
    fetch(create_url, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}


// Delete tasks

let deleteForm = document.getElementById('delete-form')
deleteForm.addEventListener("submit",(e) => {
    let id = document.getElementById('id').value
    e.preventDefault()
    let deleteUrl = `${baseUrl}/tasks/${id}/`
    let options = {
        method: 'DELETE',
        headers : {
            'Authorization':'Bearer ' + localStorage.getItem('access')
        }
    }
    fetch(deleteUrl, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})