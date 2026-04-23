import { Router } from "express";
import { MoviesController } from "../controllers/movies.js";

export const createMoviesRouter = ({ moviesModel }) => {
  const router = Router();
  const moviesController = new MoviesController({ moviesModel });

  router.get("/", moviesController.getAll);
  router.get("/:id", moviesController.getById);
  router.post("/", moviesController.create);
  router.patch("/:id", moviesController.update);
  router.delete("/:id", moviesController.delete);

  return router;
};
