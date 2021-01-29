// my api ef1469caf7056b082001780980ad0619
 
var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var apiKey = 'ef1469caf7056b082001780980ad0619';
var h1 = $('<h1>');


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

      // saves city to local storage
      localStorage.setItem(key, value);

      search(value);

    });

    function search(value) {
        // this adds user city input on to the api call
        var updatedUrl = weatherUrl + value + '&appid=' + apiKey ;
        console.log(updatedUrl);

        // fetches the updated url and returns data for user city 
        fetch(updatedUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                paste(json);
            })

       

    }

    // This function will put the data retreived with the fetch funtion on the page
    function paste(json) {

        console.log(json);
        var date = (json.list[0].dt_txt);
        console.log(date);
        var name = (json.city.name);
        var nameDate = name + ' ' + date;
        console.log(nameDate);
        h1.text(nameDate);

        var row = $('<section>').addClass('row gy-1');
        $('#current').prepend(row);
        row.append(h1);
        
    }

});

// use user input to add to query when fetching data from weather api
// user user input to create and append city name to first row/column
// once i fetch weather api, sort through it and display current weather and 5 day forcast