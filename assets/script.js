const apiKey = "cf06ad0d8bce825ca1762a6043de42bc";
const history = JSON.parse(localStorage.getItem('history')) || [];
var searchFormEl = $('#search-form');
var cityListEl = $('#history');

// Populate history list from local storage when page loads
$('#search-form').on('submit', function(event) {
    event.preventDefault();
    const userInput = $('#search-input').val();
    const queryURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // Put the search value on the history list container
    // if there is nothing in the form entered, don't print tothe page
    if (!userInput) {
        console.log('No search item filled out in the form');
        return;
    }
    //print to the page
    
    cityListEl.append("<li class='breadcrumb'>" + userInput + "</li>");
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
        
        const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        
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
            console.log(weathers)
            // weathers[0] will be today's weather
             // TODO: put today's weather in container for today's weather            
            var city = response[0].name;
            
            var currentDate = new Date();
            
            $('#current-city').text(city + " (" + currentDate.toLocaleDateString() + ")")
            var iconcode = weathers[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var temp = weatherResponse.list[0].main.temp;
            
            var wind = weatherResponse.list[0].wind.speed;
            
            var humidity = weatherResponse.list[0].main.humidity;
            $('#wicon').attr('src', iconURL);
            $('#current-temperature').text(temp + " °C");
            $('#current-wind').text(wind + " KPH");
            $('#current-humidity').text(humidity + "%");

            // weathers[1 - 4] will be 5 days forecast
            // TODO: put 5 day's forecast weather in container for the 5 day forecast
            var date01 = weathers[0].dt_txt;
            //format date
            var fdate01 = moment(date01).format("DD/MM/YYYY");
            
            var iconcode = weathers[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
            
            var temp01 = weathers[0].main.temp;
            
            var wind01 = weathers[0].wind.speed;
           
            var humidity01 = weathers[0].main.humidity;
            
            $('#date01').text(fdate01);
            $('#wicon01').attr('src', iconURL);
            $('#forecast-temperature01').text(temp01 + " °C");
            $('#forecast-wind01').text(wind01 + " KPH");
            $('#forecast-humidity01').text(humidity01 + "%");

            var date02 = weathers[1].dt_txt;
            //format date
            var fdate02 = moment(date02).format("DD/MM/YYYY");
            var iconcode = weathers[1].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
            var temp02 = weathers[1].main.temp;
            
            var wind02 = weathers[1].wind.speed;
            
            var humidity02 = weathers[1].main.humidity;
            console.log(humidity02)
            
            $('#date02').text(fdate02);
            $('#wicon02').attr('src', iconURL);
            $('#forecast-temperature02').text(temp02 + " °C");
            $('#forecast-wind02').text(wind02 + " KPH");
            $('#forecast-humidity02').text(humidity02 + "%");

            var date03 = weathers[2].dt_txt;
            //format date
            var fdate03 = moment(date03).format("DD/MM/YYYY");
            var iconcode = weathers[2].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var temp03 = weathers[2].main.temp;
            var wind03 = weathers[2].wind.speed;
            var humidity03 = weathers[2].main.humidity;
            
            $('#date03').text(fdate03);
            $('#wicon03').attr('src', iconURL);
            $('#forecast-temperature03').text(temp03 + " °C");
            $('#forecast-wind03').text(wind03 + " KPH");
            $('#forecast-humidity03').text(humidity03 + "%");

            var date04 = weathers[3].dt_txt;
            //format date
            var fdate04 = moment(date04).format("DD/MM/YYYY");
            var iconcode = weathers[3].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var temp04 = weathers[3].main.temp;
            var wind04 = weathers[3].wind.speed;
            var humidity04 = weathers[3].main.humidity;
            
            $('#date04').text(fdate04);
            $('#wicon04').attr('src', iconURL);
            $('#forecast-temperature04').text(temp04 + " °C");
            $('#forecast-wind04').text(wind04 + " KPH");
            $('#forecast-humidity04').text(humidity04 + "%");

            var date05 = weathers[4].dt_txt;
            //format date
            var fdate05 = moment(date05).format("DD/MM/YYYY");
            var iconcode = weathers[4].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var temp05 = weathers[4].main.temp;
            var wind05 = weathers[4].wind.speed;
            var humidity05 = weathers[4].main.humidity;
            
            $('#date05').text(fdate05);
            $('#wicon05').attr('src', iconURL);
            $('#forecast-temperature05').text(temp05 + " °C");
            $('#forecast-wind05').text(wind05 + " KPH");
            $('#forecast-humidity05').text(humidity05 + "%");

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
