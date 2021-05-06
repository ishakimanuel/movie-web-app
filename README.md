# test readme

# MovieWebApp

A website that shows movies base on imdb api. Using react js, redux and other modern frontend dependencies, build with create-react-app.

## Tech stack

- React
- TailwindCSS
- Redux + toolkit
- Axios
- Jest + TestingLibrary
- Etc..

## Installation and run

All you need is to clone this repo and instal all the dependencies, using npm or yarn (i recommend to use yarn)

`yarn install`

After all dependencies installed, here all the available commands:

- `yarn dev` to running the repo in development mode
- `yarn build` to build the repo in ready production
- `yarn` test to run the unit test

## Features

- A homepage to welcoming user
- A movie list page with some features:
    - Will show initial movie list with default search keyword
    - Search movie base on keyword (will start fetching on enter or click search button)
    - Search movie with keyword suggestions, click one of keyword  from suggestion list to start fetching movie list base on that keyword.
    - Finite scroll with default last offset, it means, next list will start fetched without wait for last item visible on screen
    - Click on movie card image will open modal that shows selected movie poster
    - Click on see detail button will redirect to it’s detail page
- A movie detail page which shows full information about the movie (base on imdbid)