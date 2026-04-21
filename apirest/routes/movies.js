import { Router } from "express";
import { MoviesController } from "../controllers/movies.js";

const router = Router();

router.get("/", MoviesController.getAll);

router.get("/:id", MoviesController.getById);

router.post("/", MoviesController.create);

router.patch("/:id", MoviesController.update);

router.delete("/:id", MoviesController.delete);

export default router;
