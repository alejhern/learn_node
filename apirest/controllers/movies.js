import { validateMovie, validateMoviePartial } from "../schemas/movie.js";
export class MoviesController {
  constructor({ moviesModel }) {
    this.moviesModel = moviesModel;
  }

  getAll = async (req, res) => {
    const { title, genre, year, director } = req.query;
    const movies = await this.moviesModel.getAll({
      title,
      genre,
      year,
      director,
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ error: "No movies found matching criteria" });
    }

    res.json(movies);
  };

  getById = async (req, res) => {
    const movie = await this.moviesModel.getById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  };

  create = async (req, res) => {
    const result = await validateMovie(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues,
      });
    }
    const newMovie = await this.moviesModel.create(result.data);

    res.status(201).json(newMovie);
  };

  update = async (req, res) => {
    const { id } = req.params;

    const updatedMovie = req.body;
    const result = validateMoviePartial(updatedMovie);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues,
      });
    }

    const movie = await this.moviesModel.update(id, result.data);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const success = await this.moviesModel.delete(id);

    if (!success) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(204).send();
  };
}
