// ui.js

export function displayGames(gamesData, container, onCardClick) {
    let displayBox = "";
  
    gamesData.forEach((game, index) => {
      const truncatedDescription =
        game.short_description.length > 100
          ? game.short_description.substring(0, 100) + "..."
          : game.short_description;
  
      displayBox += `
        <div class="col-md-4 col-sm-6 col-xl-3">
          <div class="card h-100 card-bg" data-id="${index}">
            <div class="card-p pb-0">
              <img src="${game.thumbnail}" class="card-img-top object-fit-cover rounded-top-2 h-50" alt="${game.title}">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title text-white fs-6">${game.title}</h5>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>
                <p class="card-text text-center card-desc m-auto p-auto">${truncatedDescription}</p>
              </div>
            </div>
            <div class="card-footer card-f">
              <div class="d-flex justify-content-between">
                <p class="rounded-3">${game.genre}</p>
                <p class="rounded-3">${game.platform}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  
    container.innerHTML = displayBox;
  
    container.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        onCardClick(gamesData[id]);
      });
    });
  }
  
  export function displayDetails(game, detailsContainer) {
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
  
    detailsContainer.innerHTML = content;
  }
  