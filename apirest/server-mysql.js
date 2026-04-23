import createApp from "./app.js";
import { MoviesModel } from "./models/movies_db.js";

createApp({ moviesModel: MoviesModel });
