const apiKey = 'dc6zaTOxFJmzC';
let search;
let limit = 10;




$(document).ready(() => {

    //TODO: create array for gif search data

    let gifArr = ['lions', 'tigers', 'superman', 'deer', 'turkey', 'shark', 'mahi mahi', 'tuna', 'gorilla', 'dragon'];
    let allowedChar = 'abcdefghijklmnopqrstuvwxyz'.split('');

//TODO: create a function that will format query strings for api search: search?q=ryan+gosling&api_key=${apiKey}&limit=5
// + = space, & = more queries
    const encoder = (searchValue) => {
        let str = searchValue.toLowerCase();
        let newString = [];

        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                newString[i] = '+';
            } else {
                if (allowedChar.indexOf(str[i]) > -1) newString[i] = str[i];
            }
        }
        return newString.join('');
    };
//TODO: create a new button from input text form and submit

    $('#form').on('submit', (event) => {
        event.preventDefault();
        $('<button>').addClass('btn, btn-info tags').html(event.originalEvent.target[0].value).on('click', buttonClick).appendTo('.api-buttons');

    });

//TODO: layout buttons from array items

    gifArr.forEach((gifSearch => {
        $('<button>').addClass('btn, btn-info tags').html(gifSearch).appendTo('.api-buttons');
    }));

    const buttonClick = function () {
        search = encoder($(this).html());
        console.log(search);
        var xhr = $.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=${limit}`);
        xhr.done(data => { 
            $('.gif-imgs').empty();
            for (dataType in data) {
                for (let i = 0; i < data[dataType].length; i++) {
                    $('<div>').addClass('gif-imgs').html(`<img src="${data[dataType][i].images.original.url}">`).appendTo('.image');
         
                }

            };
            console.log("success got data", data); 
        });
    };

    //TODO: create on click for buttons
        $('.tags').on('click', buttonClick);




    //TODO: Build API.  steps needed
    // var xhr = $.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=${limit}`);
    // xhr.done(data => { 
    //     // console.log(typeof(data.data));
    //     for (dataType in data) {
    //         for (let i = 0; i < data[dataType].length; i++) {
    //             $('<button>').html(`<img src="${data[dataType][i].url}">`).appendTo('.image');
    //             console.log('got one');
    //             // console.log(data[dataType][i]);
    //         }
    //     // console.log(data[dataType][0]);
    //         // $('.image').html(`<img src="${gif.url}">`).appendTo('body');
    //     };
    //     console.log("success got data", data); 
    // });
	

});
			