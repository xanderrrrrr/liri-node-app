# liri-node-app

## Clearly state the problem the app is trying to solve (i.e. what is it doing and why)

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Give a high-level overview of how the app is organized
This application has a few functions based on these actions specififed by the user:
* `concert-this`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`

Each action is a function, and the functions are called upon a switch/case statement. The case calls the corresponding function and we run some APIs with the user's input as the search query for these APIs and return some information to the command line. 


## Instructions on how to run the app
1. The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

* Step One: Visit <https://developer.spotify.com/my-applications/#!/>

* Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

* Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

* Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

2. After you have your spotify id and secrets, you'll reate your own `.env` file to the root folder, add the following to it, and replace the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

Afterward you can install your node packages with the following command in the root folder: 

`npm install`

Once you've done that you're set to go

## Clearly list the technologies used in the app
We used the following:
* [Node](https://nodejs.org/en/)
* [Node Package Manager](https://www.npmjs.com/)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Axios](https://www.npmjs.com/package/axios)
    * Used Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)

## Role in the app development

I wrote the entire application in javascript, taking advantage of all the above technologies to get a working _LIRI_

## See it in action
spotify-this-song: 

![](https://s3.amazonaws.com/cloudapp-workfront/items/2B3N2P053L0846120G1a/Screen%20Recording%202019-10-24%20at%2010.30%20AM.gif)

concert-this: 

![](https://s3.amazonaws.com/cloudapp-workfront/items/0D061I0C0r3R0P3T0q3M/Screen%20Recording%202019-10-24%20at%2010.41%20AM.gif)

move-this: 

![](https://s3.amazonaws.com/cloudapp-workfront/items/2w2z1e0X3C1R3v000H3k/Screen%20Recording%202019-10-24%20at%2011.39%20AM.gif?X-CloudApp-Visitor-Id=2953667)


do-what-it-says:

![](https://s3.amazonaws.com/cloudapp-workfront/items/3M0O1n0F431324351u0O/Screen%20Recording%202019-10-24%20at%2011.42%20AM.gif?X-CloudApp-Visitor-Id=2953667)

The above action takes whatever is inputted into the random.txt file and runs the corresponding function alongside the  argument to be searched. 
Here's a short video of editing the text file and running it again: http://drop.workfront.com/926da82cb42a 