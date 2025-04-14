import express from "express";
import cors from "cors";
import pg from "pg";
import config from "./config.js";

const { Client } = pg;
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new Client(config);
client.connect();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//

// USERS
async function getUserProfile() {
  const result = await client.query("SELECT * FROM users ORDER BY user_id DESC LIMIT 1;");
  console.log(result);
  console.log(result.rows);
  return result.rows[0];
}

app.get("/get-user-profile", async (req, res) => {
  const userProfile = await getUserProfile();
  res.send(userProfile);
});

async function saveUserProfile({full_name, country, email, bio}) {
  await client.query(
    "INSERT INTO users (full_name, country, email, bio) VALUES ($1, $2, $3, $4)",
    [full_name, country, email, bio]
  );
}

// full_name, country, email, bio

app.post("/add-user-profile", async (req, res) => {
  const { full_name, country, email, bio} = req.body;
  await saveUserProfile({ full_name, country, email, bio});
  res.send("User profile saved successfully");
});

// saved countries

async function getSavedCountries() {
  const result = await client.query("SELECT * FROM saved_countries");
  console.log(result);
  console.log(result.rows);
  return result.rows;
}

app.get("/get-saved-countries", async (req, res) => {
  const savedCountries = await getSavedCountries();
  res.send(savedCountries);
});

// save a country

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

// click count

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

// update country count

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
  await updateCountryCount({ country_name }); 
  res.send("Country count updated successfully");
});