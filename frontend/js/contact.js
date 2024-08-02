const radioDivs = document.querySelectorAll('.query-type');
let sideNavBar = document.getElementById('side-btn')
let sideActive = document.querySelector('aside')
let time = document.getElementById('time')
const mainBody = document.querySelector('.main-body')
const days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userNameAdd = sideActive.querySelector('.grid .name p')


if (!isLoggedIn){
    window.location.href = '/task-manager/login.html'
}

userNameAdd.innerHTML = localStorage.getItem('user')    


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
setInterval(formatDate, 100)


const changeRadioBg = () => {
    radioDivs.forEach(radioDiv => {
        const radio = radioDiv.querySelector("input");
        if (radio.checked) {
            radioDiv.classList.add("radio-selected");
        } else {
            radioDiv.classList.remove("radio-selected");
        }
    });
};

// Add event listeners to the radio buttons
radioDivs.forEach(radioDiv => {
    const radio = radioDiv.querySelector("input");
    radio.addEventListener('change', changeRadioBg);
});



function validate(){
    let isValid = true
    const firstName = document.getElementById('firstname')
    const lastName = document.getElementById('lastname')
    const email = document.getElementById('email')
    const text = document.querySelector('textarea')
    const queryType = document.querySelector('.query-type')
    const querySelect = queryType.classList.contains('radio-selected')
    const checkBox = document.querySelector('.checkbox input')
    
    var ferror = document.querySelector('.fname .error')
    var lerror = document.querySelector('.lname .error')
    let eError = document.querySelector('.email .error')
    let tError = document.querySelector('.message .error')
    let qError = document.querySelector('.q-error')
    let cError = document.querySelector('.check .error')


    if (! firstName.value.trim()){
        ferror.classList.remove('hidden')
        firstName.style.border = '2px solid red'
        isValid = false
    } else{
        ferror.classList.add('hidden')
        firstName.style.border = '2px solid green'
    }

    if (! lastName.value.trim()){
        lerror.classList.remove('hidden')
        lastName.style.border = '2px solid red'
        isValid = false
    } else{
        lerror.classList.add('hidden')
        lastName.style.border = '2px solid green'
    }

    var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    result = regex.test(email.value)
    if (! email.value.trim()){
        eError.classList.remove('hidden')
        email.style.border = '2px solid red'
        isValid = false
    } else if (! result){
        eError.classList.remove('hidden')
        eError.innerText = 'Invalid email address'
        email.style.border = '2px solid red'
        isValid = false
    }
     else{
        eError.classList.add('hidden')
        email.style.border = '2px solid green'
    }

    if (! text.value.trim()){
        tError.classList.remove('hidden')
        text.style.border = '2px solid red'
        isValid = false
    } else{
        tError.classList.add('hidden')
        text.style.border = '2px solid green'
    }

    if (! querySelect){
        qError.classList.remove('hidden')
        isValid = false
    } else{
        qError.classList.add('hidden')
    }
    
    if (! checkBox.checked){
        cError.classList.remove('hidden')
        isValid = false
    } else{
        cError.classList.add('hidden')
    }

    return isValid
}


const sent = document.querySelector('.sent')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let res = validate()
    if (res){
        sent.classList.remove('hidden')
    }
    else{
        sent.classList.add('hidden')
    }

})