const apiKey = "cf06ad0d8bce825ca1762a6043de42bc";
const history = JSON.parse(localStorage.getItem('history')) || [];
var searchFormEl = $('#search-form');
var cityListEl = $('#history');

// Populate history list from local storage when page loads
$('#search-form').on('submit', function(event) {
    event.preventDefault();
    const userInput = $('#search-input').val();
    const queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // Put the search value on the history list container
    // if there is nothing in the form entered, don't print tothe page
    if (!userInput) {
        console.log('No search item filled out in the form');
        return;
    }
    //print to the page
    
    cityListEl.append('<div>' + userInput + '</div>');
    //clear the form input element
    $('input[name="search-input"]').val('');
    //Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));
    // Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({
        url : queryURL
    }).then (function(response){
        const lat = response[0].lat;
        const lon = response [0].lon;

        const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        // Call 5 day weather forecast API after we have city lat and long value
        $.ajax({
            url : weatherQueryUrl
        }).then(function(weatherResponse) {
            //Put the response on the HTML page
            const weatherList = weatherResponse.list
            const weathers = [];
            for (let i = 0; i < weatherList.length; i += 8) {
                weathers.push(weatherList[i]);
            }

            // weathers[0] will be today's weather
            var city = response[0].name;
            console.log(city)
            var currentDate = new Date();
            console.log(currentDate)
            $('#current-city').text(city + " (" + currentDate.toLocaleDateString() + ")")
            var temp = weatherResponse.list[0].main.temp;
            console.log(temp)
            var wind = weatherResponse.list[0].wind.speed;
            console.log(wind)
            var humidity = weatherResponse.list[0].main.humidity;
            console.log(humidity)
            $('#current-temperature').text(temp + " °C");
            $('#current-wind').text(wind);
            $('#current-humidity').text(humidity);

            // weathers[1 - 4] will be 5 days forecast
            // TODO: put today's weather in container for today's weather
            // TODO: put 5 day's forecast weather in container for the 5 day forecast
            // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"

        })

    })





})

//create a function to handle form submission
// function handleFormSubmit(event) {
//     event.preventDefault();
    //select form element by its `name` attribute and gets its value
    // var userInput = $('input[name="search-input"]').val();

    // if there is nothing in the form entered, don't print tothe page
    // if (!searchItem) {
    //     console.log('No search item filled out in the form');
    //     return;
    // }

    //print to the page
    
    // cityListEl.append('<div>' + userInput + '</div>');

    //clear the form input element
    // $('input[name="search-input"]').val('');
// }

//Create a submit event listener on the form element
// searchFormEl.on('submit', handleFormSubmit);
