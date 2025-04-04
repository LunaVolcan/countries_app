-- TABLES
-- Change name to database-schema.sql

-- counting table for all user COUNTRIES (country_id, country_name, search_count integer)
CREATE TABLE country_counts (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR,
    search_count INT
)
INSERT INTO country_counts (country_name, search_count)
VALUES  
    ('Mexico', 3),
    ('United States', 2),
    ('Germany', 1);

-- USERS (user_id PRIMARY KEY, full_name, country, email, bio)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, -- or we could use serial
    full_name VARCHAR,
    country VARCHAR,
    email VARCHAR,
    bio VARCHAR
)

INSERT INTO users (full_name, country, email, bio)
VALUES
    ('Bob Barker', 'United States', 'bob@priceisright.com', 'the price is wrong'),
    ('Philliam', 'Antarctica', 'phil@philiam.com', 'the price is right'),
    ('Carmen Sandiego', 'Guatemala', 'carmen@place.com', 'actually from everywhere');

CREATE TABLE saved_countries (
    id SERIAL PRIMARY KEY,
    user_id INT,
    common_name VARCHAR(255)
);

INSERT INTO saved_countries (user_id, common_name)
VALUES 
    ('1', 'Colombia'),
    ('2', 'Germany'),
    ('3', 'Mexico');

    -- Fetch all countries from the country_counts table.
    SELECT * FROM country_counts;

    -- Fetch all users from the users table.
    SELECT * FROM users;

    -- Fetch all saved countries from the saved_countries table.
    SELECT * FROM saved_countries;

    --Fetch a country based on its country_id.
    SELECT *FROM country_counts WHERE country_id = '001';

    --Get the top 5 most searched countries.
    SELECT * FROM country_counts 
    ORDER BY search_count DESC LIMIT 5;

    --Retrieve a specific user’s details.
    SELECT * FROM users WHERE user_id = '0012';

    --Fetch all countries saved by a specific user.
    SELECT sc.id, sc.user_id, sc.country_id, sc.common_name, cc.country_name, cc.search_count
    FROM saved_countries sc
    JOIN country_counts cc ON sc.country_id = cc.country_id
    WHERE sc.user_id = '0012';

