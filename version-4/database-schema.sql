-- TABLES
-- Change name to database-schema.sql

-- counting table for all user COUNTRIES (country_id, country_name, search_count integer)
CREATE TABLE country_counts (
    country_id VARCHAR PRIMARY KEY,
    country_name VARCHAR,
    search_count INT
)
INSERT INTO country_counts (country_id, country_name, search_count);
VALUES  
    ('001', 'Mexico', 3),
    ( '002', 'United States', 2),
    ( '004', 'Germany', 1);

-- USERS (user_id PRIMARY KEY, full_name, country, email, bio)
CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY, -- or we could use serial
    full_name VARCHAR,
    country VARCHAR,
    email VARCHAR,
    bio VARCHAR
)

INSERT INTO users (user_id, full_name, country, email, bio);
VALUES
    ('0012', 'Bob Barker', 'United States', 'bob@priceisright.com', 'the price is wrong'),
    ('0013', 'Philliam', 'Antarctica', 'phil@philiam.com', 'the price is right'),
    ( '0019', 'Carmen Sandiego', 'Guatemala', 'carmen@place.com', 'actually from everywhere');

CREATE TABLE saved_countries (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    country_id VARCHAR(255),
    common_name VARCHAR(255)
);

INSERT INTO saved_countries (user_id, country_id, common_name)
VALUES 
    ('0012', '134124', 'Colombia'),
    ('0012', '004', 'Germany'),
    ('0012', '001', 'Mexico');

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

