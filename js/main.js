// main.js

import { fetchGames } from "./api.js";
import { displayGames, displayDetails } from "./ui.js";

const activeLinks = document.querySelectorAll(".nav-link");
const loading = document.querySelector(".loading");
const inner = document.getElementById("inner");
const header = document.getElementById("header");
const details = document.querySelector(".details");
const detailsContent = document.getElementById("detailsContent");
const btnClose = document.getElementById("btnClose");

const API_KEY = "970f4aa0b6msh272ef5d4be424d2p168724jsn591b5198a4f0";
const API_HOST = "free-to-play-games-database.p.rapidapi.com";

let Category = "mmorpg"; // Default category

// Close details view
btnClose.addEventListener("click", () => {
  details.classList.add("d-none");
  header.classList.remove("d-none");
  inner.classList.remove("d-none");
});

// Handle category click
activeLinks.forEach((link) => {
  link.addEventListener("click", function () {
    activeLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    Category = this.getAttribute("data-category");
    loadGames(Category);
  });
});

// Load games
async function loadGames(category) {
  try {
    loading.classList.remove("d-none");

    const gamesData = await fetchGames(category, API_KEY, API_HOST);
    displayGames(gamesData, inner, (game) => {
      displayDetails(game, detailsContent);
      details.classList.remove("d-none");
      header.classList.add("d-none");
      inner.classList.add("d-none");
    });

    loading.classList.add("d-none");
  } catch (error) {
    console.error("Error loading games:", error);
  }
}

// Initial load
loadGames(Category);
