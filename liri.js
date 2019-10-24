require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var moment = require("moment")
var fs = require('fs');

var selector = process.argv[2];
var args = process.argv;
var movieName = ""

for (var i = 3; i < args.length; i++) {
    if (i > 3 && i < args.length) {
        movieName = movieName + "+" + args[i];
    } else {
        movieName += args[i];
    }
}

function spotifyThis(param1) {
    if (param1) {
        movieName = param1.replace(/['"]+/g, '');
    }
    // if no parameter is given, then we'll automatically return The Sign by Ace of Bass
    if(movieName.length < 1) {
        movieName = "The+Sign"
        spotify
        .search({ type: 'track', query: movieName })
        .then(function(response) {
            console.log(response.tracks.items[2].artists[0].name)
        })
        .catch(function(err) {
            console.log(err);
        });
    } 

    // if you do give a parameter, then query the api and return the first result
    else {
    spotify
    .search({ type: 'track', query: movieName })
    .then(function(response) {
        // console.log(response);
        console.log("Artist Name: " + response.tracks.items[0].artists[0].name)
        console.log("Track Name: " + response.tracks.items[0].name)
        console.log("Preview URL: " + response.tracks.items[0].external_urls.spotify)
        console.log("Album Name: " + response.tracks.items[0].album.name)
    })
    .catch(function(err) {
        console.log(err);
    });}
}

function movieThis(param1) {
    if (param1) {
        movieName = param1.replace(/['"]+/g, '');
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of origin : " + response.data.Country);
        console.log("Plot : " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);

    })
    .catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
 
}

function concertThis(param1) {
    if (param1) {
        movieName = param1.replace(/['"]+/g, '');
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + movieName + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {
        var data = response.data[0]
        
        console.log("Lineup: " + data.lineup);
        console.log("Venue city: " + data.venue.city);
        var timifying = moment(data.datetime).format('MMMM Do YYYY, h:mm:ss a')
        console.log("Date of event: " + timifying)


    })
    .catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function runTheThings(func1,param1) {
    if (func1 === "spotify-this-song") {
        spotifyThis(param1);
    } else if(func1 === "movie-this") {
        movieThis(param1);
    } else if(func1 === "concert-this") {
        concertThis(param1)
    }
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(err, contents) {
        var splitArray = contents.split(',');
        var firstIndex = splitArray[0];
        var secondIndex = splitArray[1]
        runTheThings(firstIndex,secondIndex)
    });
    console.log('after calling readFile');
}

switch (selector) {
    case "spotify-this-song":
        // spotify is done
        spotifyThis();
        break;
    case "movie-this":
        // movie this is done
        movieThis();
        break;
    case "concert-this":
        // concert this is done
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("you must specify a correct action before your desired object: ");
        console.log("spotify-this-song")
        console.log("movie-this")
        console.log("concert-this")
        console.log("do-what-it-says")
        break;
}