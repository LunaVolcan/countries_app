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

async function saveCountry({ id, user_id, common_name }) {
  await client.query(
    "INSERT INTO saved_countries (id, user_id, common_name) VALUES ($1, $2, $3)",
    [id, user_id, common_name]
  );
}

app.post("/add-saved-country", async (req, res) => {
  const { id, user_id, common_name } = req.body;
  await saveCountry({ id, user_id, common_name });
  res.send("Country saved successfully");
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

//  create herloer function
// create api endpoitn
//  make sure that the information through the country name , maybe
// get the count
// add one to count
//send back to front end
//displasy
//what happens when you click on a country and it isnt in the data base yet: a new row is created
//change country ID to serial data type
//google how to increment an integer postgreSQL

//Next step is to get the backend to speak to the front end when someone cliks the save button, it has to increment
// to update something in a SQL database you can use th UPDATE clause

// async function saveUserProfile({ fullName, email, country, bio }) {
//   await client.query('DELETE FROM users') // Optional: keep only the latest profile
//   await client.query(
//     'INSERT INTO users (full_name, email, country, bio) VALUES ($1, $2, $3, $4)',
//     [fullName, email, country, bio]
//   )
// }

// // SAVED COUNTRIES
// async function getSavedCountries() {
//   const result = await client.query('SELECT * FROM saved_countries')
//   return result.rows
// }

// async function saveCountry({ country_code, country_name, flag_url }) {
//   await client.query(
//     'INSERT INTO saved_countries (country_code, country_name, flag_url) VALUES ($1, $2, $3)',
//     [country_code, country_name, flag_url]
//   )
// }

// // VISIT COUNTS
// async function incrementCountryVisitCount(country_code) {
//   const result = await client.query(
//     'SELECT count FROM country_counts WHERE country_code = $1',
//     [country_code]
//   )

//   if (result.rows.length === 0) {
//     await client.query(
//       'INSERT INTO country_counts (country_code, count) VALUES ($1, 1)',
//       [country_code]
//     )
//     return 1
//   } else {
//     const newCount = result.rows[0].count + 1
//     await client.query(
//       'UPDATE country_counts SET count = $1 WHERE country_code = $2',
//       [newCount, country_code]
//     )
//     return newCount
//   }
// }

// async function getCountryVisitCount(country_code) {
//   const result = await client.query(
//     'SELECT count FROM country_counts WHERE country_code = $1',
//     [country_code]
//   )
//   return result.rows.length ? result.rows[0].count : 0
// }

// // API endpoints

// // USERS
// app.get('/get-user-profile', async (req, res) => {
//   try {
//     const profile = await getUserProfile()
//     if (!profile) return res.status(404).json({ message: 'No profile found' })
//     res.json(profile)
//   } catch (error) {
//     console.error('Error fetching profile:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })

// app.post('/add-user-profile', async (req, res) => {
//   const { fullName, email, country, bio } = req.body
//   try {
//     await saveUserProfile({ fullName, email, country, bio })
//     res.status(200).json({ message: 'Profile saved successfully' })
//   } catch (error) {
//     console.error('Error saving profile:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })

// // SAVED COUNTRIES
// app.get('/get-saved-countries', async (req, res) => {
//   try {
//     const countries = await getSavedCountries()
//     res.json(countries)
//   } catch (error) {
//     console.error('Error fetching saved countries:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })

// app.post('/add-saved-country', async (req, res) => {
//   const { country_code, country_name, flag_url } = req.body
//   try {
//     await saveCountry({ country_code, country_name, flag_url })
//     res.status(200).json({ message: 'Country saved successfully' })
//   } catch (error) {
//     console.error('Error saving country:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })

// // VISIT COUNTS
// app.get('/get-visit-count/:countryCode', async (req, res) => {
//   const { countryCode } = req.params
//   try {
//     const count = await getCountryVisitCount(countryCode)
//     res.json({ count })
//   } catch (error) {
//     console.error('Error getting visit count:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })

// app.post('/increment-visit/:countryCode', async (req, res) => {
//   const { countryCode } = req.params
//   try {
//     await incrementCountryVisitCount(countryCode)
//     res.status(200).json({ message: 'Visit count incremented' })
//   } catch (error) {
//     console.error('Error incrementing visit count:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })
