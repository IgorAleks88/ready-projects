//DOM elements
const time=document.querySelector('.time'),
 greeting=document.querySelector('.greeting'),
 name=document.querySelector('.name'),
 focus = document.querySelector('.focus');

 // Show time
 function showTime() {
     let today=new Date(),
     hours=today.getHours(),
     mins=today.getMinutes(),
     secs=today.getSeconds();

    time.innerHTML=`${hours}<span>:</span>${addZero(mins)}<span>:</span>${addZero(secs)}`
    setTimeout(showTime, 1000);
 }
// Add Zeros
 function addZero(num){
     return parseInt(num)<10 ? '0'+num : num;
 }
 // Set Background and Greeting
 function setBackgroundAndGreet(){
     let today=new Date();
     hours=today.getHours();
     if(hours<6) {
        greeting.textContent = 'Good Night, ';
        document.body.style.backgroundImage="url('./assets/images/night/01.jpg')";
     } else if (hours<12){
        greeting.textContent = 'Good Morning, ';
        document.body.style.backgroundImage="url('./assets/images/morning/01.jpg')";
     } 
     else if (hours<18){
         greeting.textContent = 'Good Afternoon, ';
         document.body.style.backgroundImage="url('./assets/images/day/01.jpg')";
         } else {
        greeting.textContent = 'Good Evening, ';
        document.body.style.backgroundImage="url('./assets/images/evening/01.jpg')";
        }
    
 }

 //Get name
function getName(){
    if(localStorage.getItem('name')===null){
        name.textContent='[Enter name]';
    } else {
        name.textContent=localStorage.getItem('name');
    }
}

//Set name
function setName(event){
if (event.type==='keypress'){
    if (event.which==13 || event.keyCode==13){
        localStorage.setItem('name', event.target.innerText); 
        name.blur();
    }
} 
else {
    localStorage.setItem('name', event.target.innerText);
}
}

 //Get focus
 function getFocus(){
    if(localStorage.getItem('focus')===null){
        focus.textContent='[Enter focus]';
    } else {
        focus.textContent=localStorage.getItem('focus');
    }
}

//Set focus
function setFocus(event){
    if (event.type==='keypress'){
        if (event.which==13 || event.keyCode==13){
            localStorage.setItem('focus', event.target.innerText); 
            focus.blur();
        }
    } 
    else {
        localStorage.setItem('focus', event.target.innerText);
    }
    }

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

 //Run
 showTime();
 setBackgroundAndGreet();
 getName();
 getFocus();
