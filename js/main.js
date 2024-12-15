const activeLinks = document.querySelectorAll(".nav-link");
const shooter = document.querySelector(".shooter");
const sailing = document.querySelector(".sailing");
const permadeath = document.querySelector(".permadeath");
const superhero = document.querySelector(".superhero");
const pixel = document.querySelector(".pixel");

const loading = document.querySelector(".loading");
const inner = document.getElementById("inner");
const header = document.getElementById("header")
const details = document.querySelector(".details") 
const btnClose = document.getElementById("btnClose")

let gamesData = [];
let displayBox = ""; 
let Category = "mmorpg"; // Default category


// document.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => {
//     details.classList.remove("d-none");
//     header.classList.add("d-none");
//     inner.classList.add("d-none");
//   });
// });

inner.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) {
    details.classList.remove("d-none");
    header.classList.add("d-none");
    inner.classList.add("d-none");
  }
});


btnClose.addEventListener("click" , () => {
  details.classList.add("d-none");
  header.classList.remove("d-none");
  inner.classList.remove("d-none");
})





activeLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove active class
    activeLinks.forEach(link => link.classList.remove("active"));

    // Add active class 
    this.classList.add("active");

    Category = this.getAttribute("data-category");  
    mainApi(Category); 
  });
});

// Fetch Games
async function mainApi(category) {
  try {
    loading.classList.remove("d-none");
    console.log(category);
    const response = await fetch(
      
      
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "970f4aa0b6msh272ef5d4be424d2p168724jsn591b5198a4f0",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );

    gamesData = await response.json();
    console.log("Data fetched successfully:", gamesData);

    displayGames(); // Display fetched games
    loading.classList.add("d-none");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayGames() {
  displayBox = ""; // displayBox 
  gamesData.forEach((game , index) => {
    const truncatedDescription =
      game.short_description.length > 100
        ? game.short_description.substring(0, 100) + "..."
        : game.short_description;

    displayBox += `
            <div class="col-md-4 col-sm-6 col-xl-3 "  id="card" >
              <div class="card h-100 card-bg" data-id="${index}">
                <div class="card-p pb-0">
                  <img src="${game.thumbnail}" class="card-img-top object-fit-cover rounded-top-2 h-50" alt="${game.title}">
                  <div class="card-body ">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="card-title text-white fs-6">${game.title}</h5>
                      <span class="badge text-bg-primary p-2">Free</span>
                    </div>
                    <p class="card-text text-center card-desc m-auto p-auto">${truncatedDescription}</p>
                  </div>
                </div>
                <div class="card-footer card-f ">
                  <div class="d-flex justify-content-between ">
                    <p class="rounded-3">${game.genre}</p>
                    <p class="rounded-3">${game.platform}</p>
                  </div>
                </div>
              </div>
            </div>
        `;
  });
  inner.innerHTML = displayBox; 


  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", (event) => {
      const id = card.getAttribute("data-id");
      displayDetails(gamesData[id]); // Pass the corresponding game object
      details.classList.remove("d-none");
      header.classList.add("d-none");
      inner.classList.add("d-none");
    });
  });

}


function displayDetails(game) {
  const content = `
  <div class="col-md-4">
  <img src="${game.thumbnail}" class="w-100" alt="image details" />
</div>
<div class="col-md-8 text-white">
  <h3>Title: ${game.title}</h3>
  <p>Category: <span class="badge text-bg-info"> ${game.genre}</span> </p>
  <p>Platform: <span class="badge text-bg-info"> ${game.platform}</span> </p>
  <p>Status: <span class="badge text-bg-info"> Live</span> </p>
  <p>Publisher: <span class="badge text-bg-info"> ${game.publisher}</span> </p>
  <p>Developer: <span class="badge text-bg-info"> ${game.developer}</span> </p>
  <p class="small">${game.short_description}</p>
  <a class="btn btn-outline-warning" target="_blank" href="${game.game_url}">Show Game</a>
</div>
  
  `;

  document.getElementById("detailsContent").innerHTML = content;
}


mainApi(Category);
