// api.js

export async function fetchGames(category, apiKey, apiHost) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const headers = {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    };
  
    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  