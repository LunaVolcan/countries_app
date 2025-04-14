const API_BASE_URL = "http://localhost:3000";

// User Profile APIs
export const getUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/get-user-profile`);
  if (!response.ok) throw new Error("Failed to fetch user profile");
  return response.json();
};

export const saveUserProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/add-user-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to save user profile");
  return response.json();
};

// Saved Countries APIs
export const getSavedCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/get-saved-countries`);
  if (!response.ok) throw new Error("Failed to fetch saved countries");
  return response.json();
};

export const saveCountry = async (countryData) => {
  const response = await fetch(`${API_BASE_URL}/add-saved-country`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(countryData),
  });
  if (!response.ok) throw new Error("Failed to save country");
  return response.json();
};

// Visit Count APIs
export const getCountryVisitCount = async (countryCode) => {
  const response = await fetch(
    `${API_BASE_URL}/get-visit-count/${countryCode}`
  );
  if (!response.ok) throw new Error("Failed to fetch visit count");
  return response.json();
};

export const incrementCountryVisit = async (countryCode) => {
  const response = await fetch(
    `${API_BASE_URL}/increment-visit/${countryCode}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) throw new Error("Failed to increment visit count");
  return response.json();
};
