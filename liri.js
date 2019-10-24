require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var moment = require("moment")

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

function spotifyThis() {
    console.log("you picked " + selector);
}

function movieThis() {
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

function concertThis() {
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

function doWhatItSays() {
    console.log("you picked " + selector);
}

switch (selector) {
    case "spotify-this-song":
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
}