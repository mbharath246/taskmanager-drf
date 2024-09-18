// const url = 'https://taskmanager-drf.onrender.com'
const url = 'http://localhost:8000/'
let loginForm = document.getElementById('login')
let registerForm = document.getElementById('register')
let error = document.querySelector('.error')
let success = document.querySelector('.success')


if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let data = new FormData(loginForm)
        let values = Object.fromEntries(data)
        let loginUrl = `${url}/login/`
        
        let options = {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(values)
        }
        error.innerHTML = ''
        success.innerHTML = ''
        fetch(loginUrl, options)
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).includes('access')){
                localStorage.setItem('token',`Bearer ${data.access}`)
                success.textContent = 'Login Successful'
                localStorage.setItem('isLoggedIn',true)
                window.location.href = '/frontend/index.html'

            } else{    
                error.textContent = data.detail
            }
        })
        .catch(err => console.log(err))
    
    })
} else if(registerForm){
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        registerUrl = `${url}/users/create/`
        let data = new FormData(registerForm)
        let values = Object.fromEntries(data)
        
        options = {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(values)
        }

        error.innerHTML = ''
        success.innerHTML = ''
        let status;
        fetch(registerUrl, options)
        .then(res => {
            status = res.status
            return res.json()
        })
        .then(data => {
            if (status !== 201) {
                if (data.email) {
                    error.textContent = data.email[0];
                } else if (data.detail) {
                    error.textContent = data.detail;
                } else {
                    error.textContent = 'An error occurred';
                }
            } else {    
                success.textContent = 'Registration Successful';
                window.location.href = '/frontend/login.html'
            }})
        .catch(err => {
            console.error('Fetch error:', err);
            error.textContent = 'An error occurred';
        })
    })
}
