



$(document).ready(() => {

    const apiKey = '&api_key=dc6zaTOxFJmzC';
    let search = `search?q=`;
    let limit = `&limit=10`;
    let url = `https://api.giphy.com/v1/gifs/`;


    //TODO: create array for gif search data

    let gifArr = ['lions', 'tigers', 'superman', 'deer', 'turkey', 'shark', 'mahi mahi', 'tuna', 'gorilla', 'dragon', 'supergirl'];
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
        return search + newString.join('');
    };

    const buttonClick = function () {
        
        thisSearch = encoder($(this).html());
        $.get(`${url}${thisSearch}${apiKey}${limit}`)
            .then(data => { 
            let running = false;
            $('.image').empty();
            for (let i = 0; i < data.data.length; i++) {
                let div = $('<div class="img-div">');
                let label = $('<label>').text(`Rating: ${data.data[i].rating}`);
                $(div).prepend(label);
                $('<img class="gif">').attr('src', `${data.data[i].images.fixed_width.url}`).addClass('gifs').on('click', function() {
                    if (!running) {
                        running = !running;
                        $(this).attr('src', `${data.data[i].images.fixed_width.url}`);
                    } else {
                        running = !running;
                        $(this).attr('src', `${data.data[i].images.fixed_width_still.url}`);
                    }
                    
                }).appendTo(div);
                $('.image').append(div);
        
            }

            console.log("success got data", data); 
        }).catch((error) => {
            if (error) console.log(`You have encountered and error: ${error}`);
        });
    };




//TODO: layout buttons from array items

    gifArr.forEach((gifSearch => {
        $('<button>').addClass('btn, btn-info tags').html(gifSearch).on('click', buttonClick).appendTo('.api-buttons');
        
    }));

    //TODO: create a new button from input text form and submit

    $('#form').on('submit', (event) => {
        event.preventDefault();
        $('<button>').addClass('btn, btn-info tags').html(event.originalEvent.target[0].value).on('click', buttonClick).appendTo('.api-buttons');

    });

    const test = function() {
        console.log($(this));
        $(this).attr('src', `${data[dataType][i].images.fixed_width_still.url}`);
        console.log('i clicked stopped!');
    };

    $('.gif').on('click', test);



    //TODO: create on click for buttons
        // $('.tags').on('click', buttonClick);




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
			