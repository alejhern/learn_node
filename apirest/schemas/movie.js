const z = require("zod");

const movieSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1),
  genre: z
    .array(
      z.enum([
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Sci-Fi",
        "Romance",
        "Crime",
        "Thriller",
        "Fantasy",
        "Animation",
        "Documentary",
      ]),
    )
    .min(1),
  year: z
    .number()
    .int()
    .min(1888, { message: "Year must be 1888 or later" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  director: z.string().min(1),
  duration: z
    .number()
    .int()
    .min(0, { message: "Duration must be a positive integer" })
    .max(500, { message: "Duration seems too long" }),
  rate: z
    .number()
    .min(0, { message: "Rate must be a positive number" })
    .max(10, { message: "Rate cannot be greater than 10" })
    .default(0),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
});

function validateMovie(movie) {
  return movieSchema.safeParse(movie);
}

module.exports = validateMovie;
