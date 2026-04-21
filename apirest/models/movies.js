import { readJSON } from "../utils.js";

const movies = readJSON("./movies.json");

export class MoviesModel {
  static getAll = async ({ title, genre, year, director }) => {
    let filteredMovies = movies;

    if (title) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.some((t) => t.toLowerCase().includes(title.toLowerCase())),
      );
    }

    if (genre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase().includes(genre.toLowerCase())),
      );
    }

    if (year) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.year === Number(year),
      );
    }

    if (director) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.director.some((d) =>
          d.toLowerCase().includes(director.toLowerCase()),
        ),
      );
    }

    return filteredMovies;
  };

  static getById = async (id) => {
    return movies.find((m) => m.id === id);
  };

  static create = async (movieData) => {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movieData,
    };

    movies.push(newMovie);
    return newMovie;
  };

  static update = async (id, updateData) => {
    const movieIndex = movies.findIndex((m) => m.id === id);

    if (movieIndex === -1) {
      return null;
    }

    const updatedMovie = { ...movies[movieIndex], ...updateData };
    movies[movieIndex] = updatedMovie;

    return updatedMovie;
  };

  static delete = async (id) => {
    const movieIndex = movies.findIndex((m) => m.id === id);

    if (movieIndex === -1) {
      return null;
    }

    movies.splice(movieIndex, 1)[0];
    return true;
  };
}
