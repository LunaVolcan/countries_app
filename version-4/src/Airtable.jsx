import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

const table = base(process.env.REACT_APP_AIRTABLE_TABLE_NAME);

// Function to add a saved country to Airtable
export const saveCountryToAirtable = async (country) => {
  try {
    const response = await table.create([
      {
        fields: {
          name: country.name.common,
          countryCode: country.cca3,
          flag: country.flags?.png || "",
          region: country.region,
          population: country.population,
        },
      },
    ]);
    console.log("Country saved to Airtable:", response);
  } catch (error) {
    console.error("Error saving country to Airtable:", error);
  }
};

// Function to fetch saved countries from Airtable
export const getSavedCountriesFromAirtable = async () => {
  try {
    const records = await table.select().all();
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error fetching saved countries from Airtable:", error);
    return [];
  }
};

// Function to remove a saved country from Airtable
export const removeCountryFromAirtable = async (recordId) => {
  try {
    await table.destroy([recordId]);
    console.log("Country removed from Airtable");
  } catch (error) {
    console.error("Error removing country from Airtable:", error);
  }
};