var inputSearch=document.querySelector("#search")
console.log(inputSearch);

// Day1 Information

var dayName=document.querySelector("#dayName")
var dayNumber=document.querySelector("#dayNumber")
var mounthName=document.querySelector("#mounthName")
var cityName=document.querySelector("#cityName")
var tempNumber=document.querySelector("#tempNumber")
var weatherCondition=document.querySelector("#weatherCondition")
var windRatio=document.querySelector("#windRatio")
var windSpeed=document.querySelector("#windSpeed")
var windDirection=document.querySelector("#windDirection")


// Day2  & Day3 Information
var NextDay=document.getElementsByClassName("NextDay")
var weatherImg=document.getElementsByClassName("weatherImg")
var bigTemp=document.getElementsByClassName("bigTemp")
var smallTemp=document.getElementsByClassName("smallTemp")
var weatherCondition2=document.getElementsByClassName("weatherCondition2")



// Get Data



async function getData(city){

var data= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=44fedb7849e14dceae8140500240701&q=${city}&days=3&aqi=no&alerts=no`)
var finalData=await data.json();
return finalData;

}

// Display first day data

function todayData(Data){
    var today= new Date()
    dayName.innerHTML=today.toLocaleDateString("en-us",{weekday:"long"})
    dayNumber.innerHTML=today.getDate()
    mounthName.innerHTML=today.toLocaleDateString("en-us",{month:"long"})
cityName.innerHTML=Data.location.name
tempNumber.innerHTML=Data.current.temp_c
weatherCondition.innerHTML=Data.current.condition.text
windRatio.innerHTML=Data.current.humidity+"%"
windSpeed.innerHTML=Data.current.wind_kph+"km/h"
windDirection.innerHTML=Data.current.wind_dir
}

// Diasplay Day2&3data
function futureData(Data){
for(var i=0;i<bigTemp.length;i++)
{   var nextDay= new Date(Data.forecast.forecastday[i+1].date)
    NextDay[i].innerHTML=nextDay.toLocaleDateString("en-us",{weekday:"long"})
    bigTemp[i].innerHTML=Data.forecast.forecastday[i+1].day.maxtemp_c
    smallTemp[i].innerHTML=Data.forecast.forecastday[i+1].day.mintemp_c
    weatherCondition2[i].innerHTML=Data.forecast.forecastday[i+1].day.condition.text
}
}



// main Function
async function main(cityName){

    var allData=await getData(cityName);
    if(!allData.error){
        todayData(allData)
        futureData(allData)
        console.log(allData);


    }
}
main()

// search input

inputSearch.addEventListener("keyup",function(){
    console.log(inputSearch.value);
    main(inputSearch.value)
})