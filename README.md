# MovieWebApp

A website that shows movies base on [imdb api](https://www.omdbapi.com/). Using react js, redux and other modern frontend dependencies, build with create-react-app.

## Tech stack

- React + create-react-app
- TailwindCSS
- Redux + toolkit
- Axios
- Jest + TestingLibrary
- Etc..

## Installation and run

All you need is to clone this repo and instal all the dependencies, by using npm or yarn (i recommend to use yarn).

command: `yarn install`

After all dependencies installed, here all the available commands to run this repo:

- `yarn dev` to running the repo in development mode
- `yarn build` to build the repo in ready production
- `yarn test` test to run the unit test

## Features

- A homepage to welcoming user
- A movie list page with some features:
    - Will show initial movie list with default search keyword
    - Search movie base on keyword (will start fetching on enter or click search button)
    - Search movie with keyword suggestions, click one of keyword  from suggestion list to start fetching movie list base on that keyword.
    - Finite scroll with default last offset, it means, next list will start fetching without waiting for last item to be visible on screen
    - Click on movie card image will open a modal which displays a poster image of the movie
    - Click on see detail button will redirect in to the movie details page
- A movie detail page which shows full information about the movie (base on imdbid)
