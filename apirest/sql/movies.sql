DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE IF NOT EXISTS movies_db;
USE movies_db;

CREATE TABLE IF NOT EXISTS movies (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    `year` INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster VARCHAR(255) NOT NULL,
    genre JSON NOT NULL,
    rate DECIMAL(2,1) NOT NULL,
    CHECK (rate >= 0 AND rate <= 10),
    CHECK (duration > 0),
    CHECK (`year` > 1800)
);

insert into movies (title, `year`, director, duration, poster, genre, rate) values
('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', JSON_ARRAY('Drama'), 9.3),
('The Godfather', 1972, 'Francis Ford Coppola', 175, 'https://i.ebayimg.com/images/g/5gAAAOSwMyBe7hnQ/s-l1200.webp', JSON_ARRAY('Crime', 'Drama'), 9.2),
('The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/6gAAAOSwMyBe7hnQ/s-l1200.webp', JSON_ARRAY('Action', 'Crime', 'Drama'), 9.0),
('Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://i.ebayimg.com/images/g/7gAAAOSwMyBe7hnQ/s-l1200.webp', JSON_ARRAY('Crime', 'Drama'), 8.9),
('The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/8gAAAOSwMyBe7hnQ/s-l1200.webp', JSON_ARRAY('Adventure', 'Drama', 'Fantasy'), 8.9);