// my api ef1469caf7056b082001780980ad0619

// variables for luxon use
let DateTime = luxon.DateTime;
let today = DateTime.local();
let regDate = today.toLocaleString(DateTime.DATE_SHORT);
console.log(regDate);
 
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = 'ef1469caf7056b082001780980ad0619';
var h1 = $('<h1>');
var img = $('<img>');
var citys = [];


$(document).ready(function () {

    // function takes what city user inputs and saves it in local storage for later use
    // need to figure out how to keep saving them and not just once
    $(document).on('click', '.btn', function () {
      console.log($(this));

      // variables for key and value pair
      var key = 'City';
      console.log(key);
      var value = $(this)[0].parentNode.children[1].value;
      console.log(value);
      citys.push(value);

      // saves city to local storage
      localStorage.setItem(key, citys);

      console.log(citys);

    //   futureSearch(value);

      currentSearch(value);

    });

    // fetch call one call API
    function futureSearch(lat, lon) {
        // this adds user city input on to the api call
        var updatedOneCallUrl = oneCallUrl + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + apiKey ;
        console.log(updatedOneCallUrl);

        // fetches the updated url and returns future weather data for user city 
        fetch(updatedOneCallUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function(futureJson) {
                uv(futureJson);
                console.log(futureJson);
            })

    }

    // fetch call for current forecast
    function currentSearch(value) {
        // adds user city input to api call
        var updatedCurrentUrl = currentWeatherUrl + value + '&units=imperial' + '&appid=' + apiKey;
        console.log(updatedCurrentUrl);

        // fetches the updated url and returns current weather data for user city
        fetch(updatedCurrentUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function(currentJson) {
                currentPaste(currentJson);
            })
    }

    // This function will put the data retreived with the fetch funtion on the page
    function currentPaste(currentJson) {

        // variable that holds longitude and latitude for one call api 
        var lat = (currentJson.coord.lat);
        var lon = (currentJson.coord.lon);
        console.log(lat);
        console.log(lon);
        futureSearch(lat, lon);

        console.log(currentJson);

        var name = (currentJson.name);
        var nameDate = name + ' ' + '(' + regDate + ')';
        // creates weather icon to be appended
        var icon = 'http://openweathermap.org/img/wn/' + currentJson.weather[0].icon+ '@2x.png';
        img.attr('src', icon);
        img.addClass('currentIcon')
        h1.text(nameDate);
        
        // creates and appends city name, date and weather icon section
        var cityName = $('<section>').addClass('flex-row gy-1 d-flex justify-content-start align-items-center');
        $('#current').prepend(cityName);
        cityName.append(h1);
        cityName.append(img);

        //variable to capture the current temperature
        var temp = (currentJson.main.temp);
        // rounds temp to nearest tenth
        var roundTemp = temp.toFixed(1);

        // appends current tempurature 
        $('#temp').html(roundTemp + ' °F');

        //variable to caputre current humidity
        var hum = (currentJson.main.humidity)

        //appends current humidity
        $('#hum').html(hum + '%');

        //variable to catupre current wind speed
        var wind = (currentJson.wind.speed)
        //rounds wind to nearest tenth
        var roundWind = wind.toFixed(1);

        //appends current wind speeds
        $('#wind').html(roundWind + ' MPH');

    }


    // function to append current uv index to current weather section
    function uv(futureJson) {

        //variables to capture current UV index
        var uv = (futureJson.current.uvi);
        console.log(uv);

        //appends currnet uv index
        $('#uv').html(uv);

        if ($(this).uv < 2) {
            $('#uv').addClass('fav');
        }
        else if ($(this).uv > 2 && uv < 5) {
            $('#uv').addClass('moderate');
        }
        else {
            $('#uv').addClass('severe');
        }

    }

});

// use user input to add to query when fetching data from weather api
// user user input to create and append city name to first row/column
// once i fetch weather api, sort through it and display current weather and 5 day forcast
//.include checks if string includes text you want
// loop through array with 3 hours interval and use if statement to see if .includes hour i want to add to forcast