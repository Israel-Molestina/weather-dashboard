var weatherUrl = "api.openweathermap.org/data/2.5/weather?q=";

$(document).ready(function () {

    $(document).on("click", "#search", function () {
      console.log($(this));

      var key = "City";
      console.log(key);

      var value = $(this)[0].childNodes[3].value;
      console.log(value);

      localStorage.setItem(key, value);
    });

});
