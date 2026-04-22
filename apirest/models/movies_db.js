import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "api_user_movie",
  password: "1234",
  database: "movies_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export class MoviesModel {
  static async getAll({ title, genre, year, director }) {
    let query =
      "SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, genre, rate FROM movies WHERE 1=1";

    const params = [];

    if (title) {
      query += " AND title LIKE ?";
      params.push(`${title}%`);
    }

    if (genre) {
      const genres = genre.split(",").map((g) => g.trim().toLowerCase());
      query += " AND JSON_CONTAINS(LOWER(genre), ?)";
      params.push(JSON.stringify(genres));
    }

    if (year) {
      query += " AND year = ?";
      params.push(year);
    }

    if (director) {
      query += " AND director LIKE ?";
      params.push(`${director}%`);
    }

    try {
      return await pool.query(query, params).then(([rows]) => rows);
    } catch (error) {
      throw new Error("DB_ERROR_GET_ALL_MOVIES", { cause: error });
    }
  }

  static async getById(id) {
    try {
      return await pool
        .query(
          "SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, genre, rate FROM movies WHERE id = UUID_TO_BIN(?)",
          [id],
        )
        .then(([rows]) => rows[0])
        .catch(() => {
          return null;
        });
    } catch (error) {
      throw new Error("DB_ERROR_GET_MOVIE_BY_ID", { cause: error });
    }
  }

  static async create(movie) {
    try {
      const [uuidRows] = await pool.query("SELECT UUID() as id");
      const id = uuidRows[0].id;

      await pool.query(
        `INSERT INTO movies
        (id, title, year, director, duration, poster, genre, rate)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          movie.title,
          movie.year,
          movie.director,
          movie.duration,
          movie.poster,
          JSON.stringify(movie.genre),
          movie.rate,
        ],
      );

      return { id, ...movie };
    } catch (error) {
      throw new Error("DB_ERROR_CREATE_MOVIE", { cause: error });
    }
  }

  static async update(id, updateData) {
    try {
      const fields = Object.keys(updateData)
        .map((key) => `${key} = ?`)
        .join(", ");

      const values = Object.values(updateData);
      values.push(id);

      const [result] = await pool.query(
        `UPDATE movies SET ${fields} WHERE id = UUID_TO_BIN(?)`,
        values,
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return { id, ...updateData };
    } catch (error) {
      throw new Error("DB_ERROR_UPDATE_MOVIE", { cause: error });
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM movies WHERE id = UUID_TO_BIN(?)",
        [id],
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("DB_ERROR_DELETE_MOVIE", { cause: error });
    }
  }
}
