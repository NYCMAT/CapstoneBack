CREATE DATABASE pernfighter;

CREATE TABLE fighter(
    fighter_id SERIAL,
    name VARCHAR(255),
    nickname VARCHAR(255),
    country VARCHAR(255),
    age int,
    weightclass VARCHAR(255),
    record VARCHAR(255),
    imgUrl VARCHAR(255)
);