import "colors";
import express from "express";
import corsMiddleware from "./cors.js";
import moviesRouter from "./routes/movies.js";

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

app.use("/movies", moviesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green);
});
