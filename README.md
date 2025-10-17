## Casting Recall - A Movie Guessing Game

Can you guess the movie based on the cast?  That's the hook of _Casting ReCall_.  The game presents you with six cast lineups, and you have ten guesses to get them all!  

This game was built using `React.js`, with `JavaScript`, `HTML`, `SCSS`,  `React Router`, and `Axios` and is currently deployed at <https://castingrecall.herokuapp.com>

_Be sure to check out the back end repo: [Casting ReCall - Node.js Back End](https://github.com/matthewcsimpson/castingrecall-server)._

## Run Locally 

1. Once you have cloned this repository make sure to run `npm i` to install any dependancies you might be missing. 
2. Make sure you download [castingcall-server](https://github.com/matthewcsimpson/castingcall-server) and do the same. 
3. You will need an api key for The Movie Database, which you can create [at their developer site](https://www.themoviedb.org/documentation/api). 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.  

You will need to provide a TMDB API key.
#  TMDB
`REACT_APP_TMDB_KEY`=`{YOUR TMDB KEY GOES HERE}`
`REACT_APP_TMDB_SEARCH_URL`=`https://api.themoviedb.org/3/search/movie?adult=false&region=US`
`REACT_APP_TMDB_MOVIE_SEARCH_URL`=`https://api.themoviedb.org/3/movie/`
`REACT_APP_TMDB_GENRE_DETAILS`=`https://api.themoviedb.org/3/genre/movie/list`
# api
`REACT_APP_API_REMOTE_URL`=`{YOUR DEPLOYMENT HERE}`

## Screenshot
<img alt="Casting ReCall - A Movie Guessing Game" src="https://github.com/user-attachments/assets/c2f92a79-37e4-4fbb-9953-a68c9480cfd8" />
