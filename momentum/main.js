//DOM elements
const date=document.querySelector('.date'),
    time=document.querySelector('.time'),
    greeting=document.querySelector('.greeting'),
    name=document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    focusDescription = document.querySelector('.focus-description'),
    city = document.querySelector('.city'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    quoteBtn = document.querySelector('#quote-btn'),
    imageBtn = document.querySelector('#image-btn'),
    imageBase="url('./assets/images/",
    images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
    partsOfDay=['night/', 'morning/', 'day/', 'evening/'],
    twentyFourHours=[];
    let imageCount=0;

//Make order of images for 24hours
function imagesOrder(){
for (let i=0; i<partsOfDay.length; i++){
    for (let j=0; j<6; j++){
        twentyFourHours.push(`${imageBase + partsOfDay[i] + images[Math.floor(Math.random() * images.length)]}')`);
    }
}
}


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
if (mins==0 &&secs==0){
    setBackground(hours);
}
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
        
     } else if (hours<12){
        greeting.textContent = 'Good Morning, ';
       
     } 
     else if (hours<18){
         greeting.textContent = 'Good Afternoon, ';
         
         } else {
        greeting.textContent = 'Good Evening, ';
        }
        setBackground(hours);  
    
 }

 //Set Background

 function setBackground(n){
    document.body.style.backgroundImage=twentyFourHours[n];
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
        if (event.target.innerText=='') {
            event.target.innerText='[Enter name]';
        } else {
        localStorage.setItem('name', event.target.innerText); 
        name.blur();
    }
}
} 
else {
    if (event.target.innerText=='') {
        event.target.innerText='[Enter name]';
    } else {
    localStorage.setItem('name', event.target.innerText);
}
}
}

//Clear Name
function clearName() {
    localStorage.removeItem('name'); 
    name.textContent='[Enter name]';
}

//Input Name
function inputName(){
    if (localStorage.getItem('name')===null) {
        name.textContent=''; 
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
            if (event.target.innerText=='') {
                event.target.innerText='[Enter name]';
            } else {
            localStorage.setItem('focus', event.target.innerText); 
            focus.blur();
            }
        } 
    } 
    else {
        if (event.target.innerText=='') {
            event.target.innerText='[Enter name]';
        } else {
        localStorage.setItem('focus', event.target.innerText);
    }
}
    
}

//Clear Focus
function clearFocus() {
    localStorage.removeItem('focus'); 
    focus.textContent='[Enter name]';
}

//Input Focus
function inputFocus(){
    if (localStorage.getItem('focus')===null) {
        focus.textContent=''; 
    }
}


//Quote Changing
async function getQuote() {  
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    const data = await res.json(); 
    let qn=Math.floor(Math.random() * data.length);
    blockquote.textContent = data[qn-1].text;
    figcaption.textContent = data[qn-1].author;
  }

  //Image Changing

function getImage(){
    imageCount++;
    setBackground(imageCount);
    imageCount++;
    if (imageCount==24){
        imageCount=0;
    }
    imageBtn.disabled = true;
    setTimeout(function() { imageBtn.disabled = false }, 1000);
    

}

name.addEventListener('click', inputName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
greeting.addEventListener('click', clearName);
focusDescription.addEventListener('click', clearFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('click', inputFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getQuote);
quoteBtn.addEventListener('click', getQuote);
imageBtn.addEventListener('click', getImage);

 //Run
 imagesOrder();
 showDate();
 showTime();
 setBackgroundAndGreet();
 getName();
 getFocus();
