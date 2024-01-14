const search=document.getElementById("search");
const btn=document.getElementById("btn");

const today = document.querySelector('#currentDay');
const currentmonth = document.querySelector('#currentmonth');
const nextDay = document.querySelector('#nextDay');
const comingDay=document.querySelector('comingDay');
const currentData = document.querySelector('#currentData');
const cityName = document.querySelector('#cityName');
const secondFooter=document.getElementById('secondFooter');
const temp = document.querySelector('#temp');
const text = document.querySelector('#text');
const water=document.getElementById('water');
const wind=document.getElementById('wind');
const smog=document.getElementById('smog');
const tempIcon = document.querySelector('#tempIcon');

const nextTempIcon = document.querySelector('#nextTempIcon');
const secondTempBig = document.querySelector('#secondTempBig');
const secondTempsmall = document.querySelector('#secondTempsmall');
const secondText = document.querySelector('#secondText');

const thirdIcon = document.querySelector('#thirdIcon');
const thirdTempBig = document.querySelector('#thirdTempBig');
const thirdTempsmall = document.querySelector('#thirdTempsmall');
const thidText = document.querySelector('#thidText');
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday" ,"Saturday"];
const errer2=document.getElementById('errer');
let numberDay;
const d = new Date();
async function weatherdata(location="cairo" , num=3){
    try{
        numberDay=num;
    var request=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=${location}&days=${3}&aqi=no&alerts=no`);
    if(request.ok){
      
    var data=await request.json();
    cityName.innerHTML=data.location.name;
    temp.innerHTML=`${data.current.temp_c}<span id="dgree" class="position-relative">o</span>C`;
    text.innerHTML=data.current.condition.text;
    today.innerHTML= `${weekdays[  new Date(data.forecast.forecastday[0].date).getDay()]}`;
    currentData.innerHTML=`${new Date(data.forecast.forecastday[0].date).getDate()}`;
    currentmonth.innerHTML=`${months[new Date(data.forecast.forecastday[0].date).getMonth()]}`;
    nextDay.innerHTML=`${weekdays[  new Date(data.forecast.forecastday[1].date).getDay()]}`;
    tempIcon.setAttribute('src',"https:"+data.current.condition.icon);
     water.innerHTML=`${data.current.humidity}%`;
     wind.innerHTML=data.current.wind_kph;
     smog.innerHTML=data.current.wind_dir;
    nextTempIcon.setAttribute('src',"https:"+data.forecast.forecastday[1].day.condition.icon);
    secondTempBig.innerHTML=`${data.forecast.forecastday[1].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    thirdIcon.setAttribute('src',"https:"+data.forecast.forecastday[2].day.condition.icon);
    thirdTempBig.innerHTML=`${data.forecast.forecastday[2].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    thirdTempsmall.innerHTML=`${data.forecast.forecastday[2].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    thidText.innerHTML=data.forecast.forecastday[2].day.condition.text;
    comingDay.innerHTML=`${weekdays[  new Date(data.forecast.forecastday[2].date).getDay()]}`;
    secondTempsmall.innerHTML=`${data.forecast.forecastday[1].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    secondText.innerHTML=data.forecast.forecastday[1].day.condition.text;
   
    }
} catch( errer){
    errer2.innerHTML= `<p class="error-message">Error retrieving weather data .please try again later</p>`
}
    };
    search.addEventListener('keyup',function(){
        if (search.value===""){
            weatherdata();
                    }
                    else{
                        weatherdata(search.value);
                    }
    });
  
    navigator.geolocation.getCurrentPosition(function(position){
        let citylocation=position.coords.latitude+""+position.coords.longitude;
        (async function(){
            await weatherdata( citylocation);
        })();
    })