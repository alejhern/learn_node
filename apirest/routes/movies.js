import { Router } from "express";
import { readJSON } from "../utils.js";

const movies = readJSON("./movies.json");
const router = Router();

router.get("/", (req, res) => {
  const { title, genre } = req.query;
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

  res.header("Content-Type", "routerlication/json");
  res.json(filteredMovies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.header("Content-Type", "routerlication/json");
  res.json(movie);
});

router.post("/", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const newMovie = {
    id: cripto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);

  res.status(201).json(result.data);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const updatedMovie = { ...movies[movieIndex], ...req.body };
  const result = validateMovie(updatedMovie);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  movies[movieIndex] = { id, ...result.data };

  res.json(movies[movieIndex]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  res.status(200).json({ message: "Movie deleted" });
});

export default router;
