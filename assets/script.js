var searchFormEl = $('#search-form');
var cityListEl = $('#history');

//create a function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    //select form element by its `name` attribute and gets its value
    var searchItem = $('input[name="search-input"]').val();

    // if there is nothing in the form entered, don't print tothe page
    if (!searchItem) {
        console.log('No search item filled out in the form');
        return;
    }

    //print to the page
    
    cityListEl.append('<div>' + searchItem + '</div>');

    //clear the form input element
    $('input[name="search-input"]').val('');
}

//Create a submit event listener on the form element
searchFormEl.on('submit', handleFormSubmit);