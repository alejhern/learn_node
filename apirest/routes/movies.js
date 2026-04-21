import { Router } from "express";
import { MoviesModel } from "../models/movies.js";
import { validateMovie, validateMoviePartial } from "../schemas/movie.js";

const router = Router();

router.get("/", async (req, res) => {
  const { title, genre, year, director } = req.query;
  const filteredMovies = await MoviesModel.getAll({
    title,
    genre,
    year,
    director,
  });

  res.json(filteredMovies);
});

router.get("/:id", async (req, res) => {
  const movie = await MoviesModel.getById(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

router.post("/", async (req, res) => {
  const result = await validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }
  const newMovie = await MoviesModel.create(result.data);

  res.status(201).json(newMovie);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedMovie = req.body;
  const result = validateMoviePartial(updatedMovie);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const movie = await MoviesModel.update(id, result.data);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await MoviesModel.getById(id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  await MoviesModel.delete(id);
  res.status(200).json({ message: "Movie deleted" });
});

export default router;
