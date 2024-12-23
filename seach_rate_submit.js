document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.querySelector("#search input");
    const searchButton = document.querySelector("#search button");
  
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " recipe")}`;
        window.open(searchUrl, "_blank");
      } else {
        alert("Please enter a recipe name to search.");
      }
    });
  
   
    const recipeCards = document.querySelectorAll(".recipe-card");
  
    function enableRating(card) {
      const rateContainer = document.createElement("div");
      rateContainer.classList.add("rate-container");
      card.appendChild(rateContainer);
  
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.dataset.value = i;
        star.classList.add("star");
        rateContainer.appendChild(star);
  
        star.addEventListener("click", () => {
          const stars = rateContainer.querySelectorAll(".star");
          stars.forEach(s => {
            if (s.dataset.value <= i) {
              s.classList.add("selected");
            } else {
              s.classList.remove("selected");
            }
          });
          alert(`You rated "${card.querySelector("h2").textContent}" ${i} star(s)!`);
        });
      }
    }
  
    recipeCards.forEach(enableRating);
  
    const submitForm = document.querySelector(".submit-recipe form");
  
    submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const recipeName = submitForm.querySelector("input[placeholder='Recipe Name']").value.trim();
      const recipeDescription = submitForm.querySelector("textarea[placeholder='Recipe Description']").value.trim();
      const recipeIngredients = submitForm.querySelector("input[placeholder='Ingredients (comma separated)']").value.trim();
      const recipeSteps = submitForm.querySelector("textarea[placeholder='Recipe Steps']").value.trim();
  
      if (recipeName && recipeDescription && recipeIngredients && recipeSteps) {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
  
        recipeCard.innerHTML = `
          <h2>${recipeName}</h2>
          <img src="https://via.placeholder.com/250" alt="${recipeName}" width="260" height="250">
          <p>${recipeDescription}</p>
          <a href="#" class="rate-btn">Rate this Recipe</a>
          <p><strong>Ingredients:</strong> ${recipeIngredients}</p>
          <p><strong>Steps:</strong> ${recipeSteps}</p>
        `;
  
        enableRating(recipeCard);
  
        document.querySelector(".recipe-grid").appendChild(recipeCard);
  
        submitForm.reset();
  
        alert("Your recipe has been submitted successfully!");
      } else {
        alert("Please fill in all the fields.");
      }
    });
  });
  
