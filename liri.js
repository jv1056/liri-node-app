require("dotenv").config();
var rp = require('request-promise');
var request = require('request');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var nodeArgs = process.argv;



var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// var weather = require("weather-js");

var command = process.argv[2];

if (command === 'weather-search'){

rp({
  "method":"GET",
  "uri": 'api.openweathermap.org/data/2.5/weather?q=' + process.argv[3] + '&units=imperial&appid=' + keys.weather.apiKey,
  "json": true,

}).then(console.log, console.log);

  // rp({ url: 'api.openweathermap.org/data/2.5/weather?q=' + process.argv[3] + '&units=imperial&appid=' + keys.weather.apiKey, resolveWithFullResponse: true })
  //   .then(function (response) {
  //       console.log(response);
  //   });
}
//   request.get({
//     url: 'api.openweathermap.org/data/2.5/weather?q=' + process.argv[3] + '&units=imperial&appid=' + keys.weather.apiKey
//   }).then(function(response){
//     console.log(response);
//   })
// }

  if (command === 'spotify-this-song'){
      var song = process.argv[3];
      var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (song === undefined){
        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
          console.log(data.tracks.items[0].artists[0].name);
          console.log(data.tracks.items[0].name);
          console.log("preview url: " + data.tracks.items[0].preview_url);
          console.log(data.tracks.items[0].album.name);
        });

      }
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    if (!err){


      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log("preview url: " + data.tracks.items[0].preview_url);
      console.log(data.tracks.items[0].album.name);
    }
    });


  }


if (command === 'movie-this'){

  var movie = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200 && movie != undefined) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Main Actors: " + JSON.parse(body).Actors);
    }else{
      request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Main Actors: " + JSON.parse(body).Actors);
      });
    }
  });
}

if (command === 'do-what-it-says'){
    fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);





  });
}
