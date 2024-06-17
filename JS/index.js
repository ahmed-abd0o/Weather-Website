var cityInput = document.querySelector("input[type='text']");
var rowSelector = document.querySelector(".row");
var daySelector = document.querySelector(".card-header h6.day");
var dayMonthSelector = document.querySelector(".card-header h6.day-month");
var cardTitle = document.querySelector("h5.card-title.main");
var cardTemp = document.querySelector("h3.temp p.main");
var cardImage = document.querySelector(".card-body img.main");
var cardCondition = document.querySelector(".card-body p.text-custom");
var windSpeed = document.querySelector("figcaption.wind-main");
var windDirection = document.querySelector("figcaption.wind-direction");


var cardImage2 = document.querySelector(".two .card-body img.main");
var cardTemp2Main = document.querySelector(".two h3.temp p.main");
var cardTemp2Secondary = document.querySelector(".two h4.temp p.secondary");
var cardCondition2 = document.querySelector(".two .card-body p.text-custom");

var cardImage3 = document.querySelector(".three .card-body img.main");
var cardTemp3Main = document.querySelector(".three h3.temp p.main");
var cardTemp3Secondary = document.querySelector(".three h4.temp p.secondary");
var cardCondition3 = document.querySelector(".three .card-body p.text-custom");


const date = new Date();
var kobry;
var latitude ;
var longitude ;
var weatherResult = {}

const windDirections = {
    N: "north",
    NNE: "north-northeast",
    NE: "northeast",
    ENE: "east-northeast",
    E: "east",
    ESE: "east-southeast",
    SE: "southeast",
    SSE: "south-southeast",
    S: "south",
    SSW: "south-southwest",
    SW: "southwest",
    WSW: "west-southwest",
    W: "west",
    WNW: "west-northwest",
    NW: "northwest",
    NNW: "north-northwest"
};


// this is for the DATE 
var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
daySelector.innerHTML = `${daysOfWeek[date.getDay()]}`
dayMonthSelector.innerHTML = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`


// input event listener changing the city
cityInput.addEventListener("input",function(){
    fetchingWeather(this.value)
});


// function fetchingWeather(stateName){
    
//     var reqWeather = new XMLHttpRequest();
//     console.log(stateName);
//     reqWeather.open("get",`http://api.weatherapi.com/v1/forecast.json?key=d2c43f8d47d242f1a56165637241206&q=${stateName}&days=3`);
//     reqWeather.send();

//     reqWeather.addEventListener("loadend",function(){

//         if(reqWeather.status >= 200 && reqWeather.status < 300){
//             if(JSON.parse(reqWeather.response).length != 0){
//                 var reqResult = JSON.parse(reqWeather.response);
//                 console.log("response is here in weather")
                
//                 //main card
//                 weatherResult.name = reqResult.location.name;
//                 weatherResult.temp = reqResult.current.temp_c;
//                 weatherResult.icon = reqResult.current.condition.icon;
//                 weatherResult.condition = reqResult.current.condition.text;
//                 weatherResult.windSpeed = reqResult.current.wind_kph;
//                 console.log(reqResult.current.wind_dir);
//                 weatherResult.direction = windDirections[reqResult.current.wind_dir];
//                 weatherResult.direction = windDirections[reqResult.current.wind_dir];
                
//                 //Second card

//                 weatherResult.icon2 = reqResult.forecast.forecastday[1].day.condition.icon
//                 weatherResult.condition2 = reqResult.forecast.forecastday[1].day.condition.text;
//                 weatherResult.temp2Main = reqResult.forecast.forecastday[1].day.maxtemp_c;
//                 weatherResult.temp2Secondary = reqResult.forecast.forecastday[1].day.mintemp_c;
                
//                 //Third Card
//                 weatherResult.icon3 = reqResult.forecast.forecastday[2].day.condition.icon
//                 weatherResult.condition3 = reqResult.forecast.forecastday[2].day.condition.text;
//                 weatherResult.temp3Main = reqResult.forecast.forecastday[2].day.maxtemp_c;
//                 weatherResult.temp3Secondary = reqResult.forecast.forecastday[2].day.mintemp_c;

//                 console.log(reqResult);
//                 writingData(weatherResult)
//             }
//             else{
//                 console.log('no response in weather');
//                 console.log(JSON.parse(reqWeather.response.Object.current.dewpoint_c));
//             }
//         }
//         else{
//             console.log("something is wrong");
//         }
//     })
// }
function fetchingWeather(stateName){
    
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=d2c43f8d47d242f1a56165637241206&q=${stateName}&days=3`)
    .then(function(res){
        res.json()
        .then(function (ress){
            console.log(ress);
            if(ress.length != 0){
                var reqResult = ress;
    
                console.log("response is here in weather")

                //main card
                weatherResult.name = reqResult.location.name;
                weatherResult.temp = reqResult.current.temp_c;
                weatherResult.icon = reqResult.current.condition.icon;
                weatherResult.condition = reqResult.current.condition.text;
                weatherResult.windSpeed = reqResult.current.wind_kph;
                console.log(reqResult.current.wind_dir);
                weatherResult.direction = windDirections[reqResult.current.wind_dir];
                weatherResult.direction = windDirections[reqResult.current.wind_dir];
                

                //Second card
                weatherResult.icon2 = reqResult.forecast.forecastday[1].day.condition.icon
                weatherResult.condition2 = reqResult.forecast.forecastday[1].day.condition.text;
                weatherResult.temp2Main = reqResult.forecast.forecastday[1].day.maxtemp_c;
                weatherResult.temp2Secondary = reqResult.forecast.forecastday[1].day.mintemp_c;
                

                //Third Card
                weatherResult.icon3 = reqResult.forecast.forecastday[2].day.condition.icon
                weatherResult.condition3 = reqResult.forecast.forecastday[2].day.condition.text;
                weatherResult.temp3Main = reqResult.forecast.forecastday[2].day.maxtemp_c;
                weatherResult.temp3Secondary = reqResult.forecast.forecastday[2].day.mintemp_c;

                //Writing Data in the object
                writingData(weatherResult)
                }
                else{
                    console.log('no response in weather');
                    console.log(JSON.parse(res.Object.current.dewpoint_c));
                }
        });
    })
        // }
        // else{
        //     console.log("something is wrong");
        // }
    }


function writingData(obj){
    cardTitle.innerHTML = obj.name;
    cardTemp.innerHTML = obj.temp;
    cardImage.src = obj.icon;
    cardCondition.innerHTML = obj.condition;
    windSpeed.innerHTML = obj.windSpeed + " Km/h";
    windDirection.innerHTML = obj.direction;

                // weatherResult.icon3 = reqResult.forecast.forecastday[1].day.condition.icon
                // weatherResult.condition3 = reqResult.forecast.forecastday[1].day.condition.text;
                // weatherResult.temp3Main = reqResult.forecast.forecastday[1].day.maxtemp_c;
                // weatherResult.temp3Secondary = reqResult.forecast.forecastday[1].day.mintemp_c;

    cardImage2.src = obj.icon2;
    cardTemp2Main.innerHTML = obj.temp2Main;
    cardTemp2Secondary.innerHTML = obj.temp2Secondary;
    cardCondition2.innerHTML = obj.condition2;


    
    cardImage3.src = obj.icon3;
    cardTemp3Main.innerHTML = obj.temp3Main;
    cardTemp3Secondary.innerHTML = obj.temp3Secondary;
    cardCondition3.innerHTML = obj.condition3;


}
function getCurrentPosition(){

    return new Promise(function(resolve , rejected){
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        function successCallback(position){
            console.log('get current position');
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve();
        };

        function errorCallback(error){
            console.log(error);
        };
    })


}


getCurrentPosition().then(function(){
    userCity( latitude , longitude ).then(function(res){
        res.json().then(function(ress){
            console.log(ress.address.state);
            fetchingWeather(ress.address.state);
        });
    })
})


function userCity (lat , long){

    return fetch(`https://us1.locationiq.com/v1/reverse?key=pk.b807f73916d95f7cf6d2cb006ed00d69&lat=${lat}&lon=${long}&format=json`)

}



