import "colors";
import express from "express";
import cripto from "node:crypto";
import { createRequire } from "node:module";
import corsMiddleware from "./cors.js";
import validateMovie from "./schemas/movie.js";

const require = createRequire(import.meta.url);
const movies = require("./movies.json");

const app = express();

app.use(express.json());
app.use(corsMiddleware);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS",
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }

//   next();
// });

app.use((req, res, next) => {
  console.log(`${req.method}`.blue + ` ${req.url}`.yellow);
  next();
});

app.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.send("<h1>Welcome to the Movie API</h1>");
});

app.get("/movies", (req, res) => {
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

  res.header("Content-Type", "application/json");
  res.json(filteredMovies);
});

app.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.header("Content-Type", "application/json");
  res.json(movie);
});

app.post("/movies", (req, res) => {
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

app.patch("/movies/:id", (req, res) => {
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

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  res.status(200).json({ message: "Movie deleted" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green);
});
