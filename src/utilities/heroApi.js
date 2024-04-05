// heroApi.js
import axios from "axios";

// Function to fetch hero details by ID
export const fetchHeroDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://akabab.github.io/superhero-api/api/id/${id}.json`
    );
    console.log(response.data); // Check the fetched data
    return response.data; // Return the hero details
  } catch (error) {
    console.error("Error fetching hero details:", error);
    return null; // Return null or handle the error as needed
  }
};

export const fetchHeroes = async () => {
  try {
    const response = await axios.get(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    return response.data; // Return the fetched heroes data
  } catch (error) {
    console.error("Error fetching superheroes:", error);
    return []; // Return an empty array or handle the error as needed
  }
};
