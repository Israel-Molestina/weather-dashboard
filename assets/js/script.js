// my api ef1469caf7056b082001780980ad0619
// how to get cities to only save once

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
var img1 = $('<img>');
var img2 = $('<img>');
var img3 = $('<img>');
var img4 = $('<img>');
var img5 = $('<img>');
var h0 = $('<h5>');
var h2 = $('<h5>');
var h3 = $('<h5>');
var h4 = $('<h5>');
var h5 = $('<h5>');
var get = localStorage.getItem('searchedCities');
if (get) {
    var cities = get.split(',');
    savedCities(cities);
    console.log(cities);
}
else {
    var cities = [];
}
console.log(cities);
// if (cities.length !== 0) {
//     savedCities(cities);
// }

    // function takes what city user inputs and saves it in local storage for later use
    $(document).on('click', '.btn', function () {
      console.log($(this));

      // variables for key and value pair
      var key = 'searchedCities';
      var value = $(this)[0].parentNode.children[1].value.toLowerCase();
      console.log(value)

      console.log(cities);
      console.log(cities.length);

    if (cities.indexOf(value) == -1) {
        cities.push(value);
        localStorage.setItem(key, cities);
        savedCities(cities);
    }

    console.log(cities);

      

      currentSearch(value);

    });


    $(document).on('click', '.goBack', function () {

        console.log($(this));
        var value = $(this)[0].innerText;
        currentSearch(value);

    })

    // this function will add the saved cities to a column on the left so user can go back to them
    function savedCities(cities) {

        var hSave = $('<h1>');
        var savedC = $('<article>').addClass('row  g-2 mt-2 border goBack');  

        cities.forEach(function(city) {

            hSave.text(city);
            console.log(city);

            $('#saved').append(savedC)
            savedC.prepend(hSave);

        })

    }

    // fetch call one call API
    function futureSearch(lat, lon) {
        // this adds user city input on to the api call
        var updatedOneCallUrl = oneCallUrl + 'lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial' + '&appid=' + apiKey ;

        // fetches the updated url and returns future weather data for user city 
        fetch(updatedOneCallUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function(futureJson) {
                forecast(futureJson);
                console.log(futureJson);
            })

    }

    // fetch call for current forecast
    function currentSearch(value) {
        // adds user city input to api call
        var updatedCurrentUrl = currentWeatherUrl + value + '&units=imperial' + '&appid=' + apiKey;

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
    function forecast(futureJson) {

        //variables to capture current UV index
        var uv = (futureJson.current.uvi);
        //appends currnet uv index
        $('#uv').html(uv);

        if (uv < 2) {
            $('#uv').removeClass('moderate severe').addClass('fav');
        }
        else if (uv >= 2 && uv <= 5) {
            $('#uv').removeClass('')
            $('#uv').removeClass('fav severe').addClass('moderate');
        }
        else {
            $('#uv').removeClass('fav moderate').addClass('severe');
        }
        
        // creates and appends weather icons for 5 day forecast
        var icon1 = 'http://openweathermap.org/img/wn/' + futureJson.daily[1].weather[0].icon+ '@2x.png';
        img1.attr('src', icon1);
        img1.addClass('currentIcon')
        $('.icon1').prepend(img1);
        
        var icon2 = 'http://openweathermap.org/img/wn/' + futureJson.daily[2].weather[0].icon+ '@2x.png';
        img2.attr('src', icon2);
        img2.addClass('currentIcon')
        $('.icon2').prepend(img2);
        
        var icon3 = 'http://openweathermap.org/img/wn/' + futureJson.daily[3].weather[0].icon+ '@2x.png';
        img3.attr('src', icon3);
        img3.addClass('currentIcon')
        $('.icon3').prepend(img3);

        var icon4 = 'http://openweathermap.org/img/wn/' + futureJson.daily[4].weather[0].icon+ '@2x.png';
        img4.attr('src', icon4);
        img4.addClass('currentIcon')
        $('.icon4').prepend(img4);

        var icon5 = 'http://openweathermap.org/img/wn/' + futureJson.daily[5].weather[0].icon+ '@2x.png';
        img5.attr('src', icon5);
        img5.addClass('currentIcon')
        $('.icon5').prepend(img5);

        // variables for 5 day forecast dates
        var dt1 = (futureJson.daily[1].dt);
        var dt2 = (futureJson.daily[2].dt);
        var dt3 = (futureJson.daily[3].dt);
        var dt4 = (futureJson.daily[4].dt);
        var dt5 = (futureJson.daily[5].dt);

        // converts dt into month/day/year format
        var day1 = new Date(dt1 * 1000).toLocaleDateString('en-US');
        var day2 = new Date(dt2 * 1000).toLocaleDateString('en-US');
        var day3 = new Date(dt3 * 1000).toLocaleDateString('en-US');
        var day4 = new Date(dt4 * 1000).toLocaleDateString('en-US');
        var day5 = new Date(dt5 * 1000).toLocaleDateString('en-US');

        // appending future dates on 5 day forecast boxes
        
        h0.text(day1);
        $('#day1').prepend(h0);

        h2.text(day2);
        $('#day2').prepend(h2);

        h3.text(day3);
        $('#day3').prepend(h3);

        h4.text(day4);
        $('#day4').prepend(h4);

        h5.text(day5);
        $('#day5').prepend(h5);

        //variable to capture the 5 day temperatures
        var temp1 = (futureJson.daily[1].temp.day);
        var temp2 = (futureJson.daily[2].temp.day);
        var temp3 = (futureJson.daily[3].temp.day);
        var temp4 = (futureJson.daily[4].temp.day);
        var temp5 = (futureJson.daily[5].temp.day);
        // rounds temp to nearest tenth
        var roundTemp1 = temp1.toFixed(1);
        var roundTemp2 = temp2.toFixed(1);
        var roundTemp3 = temp3.toFixed(1);
        var roundTemp4 = temp4.toFixed(1);
        var roundTemp5 = temp5.toFixed(1);

        // appends future tempuratures
        $('.temp1').html(roundTemp1 + ' °F');
        $('.temp2').html(roundTemp2 + ' °F');
        $('.temp3').html(roundTemp3 + ' °F');
        $('.temp4').html(roundTemp4 + ' °F');
        $('.temp5').html(roundTemp5 + ' °F');

        //variable to caputre current humidity
        var hum1 = (futureJson.daily[1].humidity)
        var hum2 = (futureJson.daily[2].humidity)
        var hum3 = (futureJson.daily[3].humidity)
        var hum4 = (futureJson.daily[4].humidity)
        var hum5 = (futureJson.daily[5].humidity)

        //appends current humidity
        $('.hum1').html(hum1 + '%');
        $('.hum2').html(hum2 + '%');
        $('.hum3').html(hum3 + '%');
        $('.hum4').html(hum4 + '%');
        $('.hum5').html(hum5 + '%');

    }

// use user input to add to query when fetching data from weather api
// user user input to create and append city name to first row/column
// once i fetch weather api, sort through it and display current weather and 5 day forcast
//.include checks if string includes text you want
// loop through array with 3 hours interval and use if statement to see if .includes hour i want to add to forcast