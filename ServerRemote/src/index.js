import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables locally

const { Client } = pg;

// PostgreSQL client setup using individual env variables
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true // ✅ Required for Render
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ========== USERS ==========
async function getUserProfile() {
  const result = await client.query("SELECT * FROM users ORDER BY user_id DESC LIMIT 1;");
  return result.rows[0];
}

app.get("/get-user-profile", async (req, res) => {
  try {
    const userProfile = await getUserProfile();
    res.send(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }
});

async function saveUserProfile({ full_name, country, email, bio }) {
  await client.query(
    "INSERT INTO users (full_name, country, email, bio) VALUES ($1, $2, $3, $4)",
    [full_name, country, email, bio]
  );
}

app.post("/add-user-profile", async (req, res) => {
  const { full_name, country, email, bio } = req.body;
  try {
    await saveUserProfile({ full_name, country, email, bio });
    res.send("User profile saved successfully");
  } catch (error) {
    console.error("Error saving user profile:", error);
    res.status(500).send("Failed to save user profile");
  }
});

// ========== SAVED COUNTRIES ==========
async function getSavedCountries() {
  const result = await client.query("SELECT * FROM saved_countries");
  return result.rows;
}

app.get("/get-saved-countries", async (req, res) => {
  try {
    const savedCountries = await getSavedCountries();
    res.send(savedCountries);
  } catch (error) {
    console.error("Error fetching saved countries:", error);
    res.status(500).send("Error fetching saved countries");
  }
});

async function saveCountry({ country_code, common_name, flag_url }) {
  await client.query(
    "INSERT INTO saved_countries (country_code, common_name, flag_url) VALUES ($1, $2, $3)",
    [country_code, common_name, flag_url]
  );
}

app.post("/add-saved-country", async (req, res) => {
  const { country_code, common_name, flag_url } = req.body;
  try {
    await saveCountry({ country_code, common_name, flag_url });
    res.send("Country saved successfully");
  } catch (error) {
    console.error("Error saving country:", error);
    res.status(500).send("Failed to save country");
  }
});

// ========== SAVE COUNT ==========
async function getCountryCount({ country_name }) {
  const result = await client.query(
    "SELECT save_count FROM country_counts WHERE country_name = $1",
    [country_name]
  );
  return result.rows[0] || { save_count: 0 };
}

app.get("/get-save-count/:countryName", async (req, res) => {
  const { countryName } = req.params;
  try {
    const result = await getCountryCount({ country_name: countryName });
    res.json(result);
  } catch (error) {
    console.error("Error fetching save count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function updateCountryCount({ country_name }) {
  await client.query(`
    INSERT INTO country_counts (country_name, save_count)
    VALUES ($1, 1)
    ON CONFLICT (country_name)
    DO UPDATE SET save_count = country_counts.save_count + 1;
  `, [country_name]);
}

app.post("/add-save-count", async (req, res) => {
  const { country_name } = req.body;
  try {
    await updateCountryCount({ country_name });
    res.send("Country count updated successfully");
  } catch (error) {
    console.error("Error updating save count:", error);
    res.status(500).send("Failed to update save count");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on https://countries-app-lfcu.onrender.com`);
});