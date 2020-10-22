//DOM elements
const date=document.querySelector('.date'),
    time=document.querySelector('.time'),
    greeting=document.querySelector('.greeting'),
     name=document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city');

//Weather
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=44dbcedb9757b9c19dfab834b5fa690d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  
  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);


 //Show date
 function showDate() {
    let today=new Date(),
    number=today.getDate(),
    month=today.getMonth(),
    day=today.getDay();

   date.innerHTML=`${number}<span> </span>${monthToString(month)}<span>, </span>${dayToString(day)}`
   setTimeout(showTime, 1000);
}

//Month to String
function monthToString(num){
    switch(num){
        case 0:
            return "January";
            break;
        case 1:
            return "February";
            break;
        case 2:
            return "March";
            break;
        case 3:
            return "April";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "June";
            break;
        case 6:
            return "July";
            break;
        case 7:
            return "August";
            break;
        case 8:
            return "September";
            break;
        case 9:
            return "October";
            break;
        case 10:
            return "November";
            break;
        case 11:
            return "December";
            break;
        default:
            return num;
            break;
    }
}

//Day to String
function dayToString(num){
    switch(num){
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return num;
            break;
    }
}

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
 showDate();
 showTime();
 setBackgroundAndGreet();
 getName();
 getFocus();
