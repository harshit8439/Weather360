const apiKey="68ed90a5a93fb887167569cdded374d1";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const apiUrl="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

let currentAudio=null;
// let flag=true;

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const weatherAudio=document.getElementsByTagName("audio");

let desc=document.getElementById("des");
let currDate=document.getElementById("curr");
let sunTime=document.getElementById("sunTime");
let sunsetTime=document.getElementById("sunsetTime");

async function checkWeather(city){   
    // const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
    const response=await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data=await response.json();
    // console.log(data);
    // reading the data from json file and manipulating the inner HTML
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
    desc.innerHTML=data.weather.main;
    document.querySelector(".humidity").innerHTML=data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML=data.wind.speed+" km/h";
    
    currDate.innerHTML=data.dt;
    const currtimestamp = parseInt(currDate.innerHTML);
    let cdate = new Date(currtimestamp * 1000);
    let currstandardFormatDate = cdate.toDateString();
    currDate.innerHTML = currstandardFormatDate;

    const sunriseTimestamp = data.sys.sunrise; // Replace 'data.sys.sunrise' with the correct path in your API response
const sunriseTime = new Date(sunriseTimestamp * 1000);
const options = { hour: '2-digit', minute: '2-digit', hour12: true };
const sunriseFormattedTime = sunriseTime.toLocaleTimeString([], options);
    sunTime.innerHTML=sunriseFormattedTime;

    // sunset
    const sunsetTimestamp = data.sys.sunset; // Replace 'data.sys.sunrise' with the correct path in your API response
const sunsetsTime = new Date(sunsetTimestamp * 1000);
const option = { hour: '2-digit', minute: '2-digit', hour12: true };
const sunsetFormattedTime = sunsetsTime.toLocaleTimeString([], option);
    sunsetTime.innerHTML=sunsetFormattedTime;
  
    // bgm
    const sound = new Audio();
    sound.src = 'no_audio.mp3';
  
   
if(data.weather[0].main=="Clouds"){
    weatherIcon.src="clouds.png";  
    document.body.style.transition = "all 2s";
    document.body.style.backgroundImage = "url('clouds2.jpg')";
    desc.innerText="Cloudy";
    sound.src='cloud_sound.mp3';
    sound.loop=true;  
}
else if(data.weather[0].main=="Clear"){
    weatherIcon.src="clear.png";
    document.body.style.transition = "all 2s";
    document.body.style.backgroundImage = "url('sunny.jpg')";
    // weatherAudio.style.src="url(bird.mp3)";
    // sound.src='no_audio';
    desc.innerText="Clear";
    sound.src='bird.mp3';
    sound.loop=true;
    
}
else if(data.weather[0].main=="Rain"){
    
    weatherIcon.src="rain.png";
    document.body.style.transition = "all 2s";
    document.body.style.backgroundImage = "url('rain2.jpg')";
    desc.innerText="Raining";
    sound.src='rain_sound.mp3';
    sound.loop=true;  
}
 else if(data.weather[0].main=="Drizzle"){
    weatherIcon.src="drizzle.png";  
    document.body.style.transition = "all 2s";
    document.body.style.backgroundImage = "url('drizzle2.jpg')";
    desc.innerText="Drizzle";   
}

 else if(data.weather[0].main=="Mist"){
    weatherIcon.src="mist.png";  
    document.body.style.transition = "all 2s";
    document.body.style.backgroundImage = "url('mist2.jpg')";
    desc.innerText="Mist";
}

if (currentAudio !== null) {
    currentAudio.pause();
    currentAudio = null;
  }
  
    sound.play();
    currentAudio=sound;
  
} 


searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
})



searchBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    checkWeather(searchBox.value);
    }
});
