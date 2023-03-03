const mealButton = document.querySelector('#meal-button');
const mealInput = document.querySelector('#meal-input');
const mealList = document.querySelector('#meal-list');

mealButton.addEventListener('click', () => {
  const searchQuery = mealInput.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        mealList.innerHTML = ''; // clear previous search results
        if (data.meals) {
          data.meals.forEach(meal => {
            // Create a new list item with the meal name, recipe, image, and YouTube video
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
            <div class="meal" style = "height: auto; padding: inherit;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); transition: 0.3s; border-radius: 25px;
            margin: 25px; color: black; background-color: white;">
            <div style="margin-left:30px;">
              <h2>${meal.strMeal}</h2>
              <h2>Category | ${meal.strCategory}</h2>
            <div class="recipe" style="display: flex;">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="height: 250px; width: 25%; margin-right: 20px;">
              
              <div class="video-container" style="width: 80%;">
                <iframe src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen style="height: 250px; width: 45%;"></iframe>
              </div>
            </div>

              <h2>Ingredients 📝</h2>
              <ul style="list-style-type: circle;">
                ${Object.entries(meal).filter(([key, value]) => key.startsWith('strIngredient') && value).map(([key, value]) => `
                  <li>${value} - ${meal[`strMeasure${key.slice(-1)}`]}</li>
                `).join('')}
              </ul>

              <h2>Recipe 👨🏼‍🍳</h2>
              <ul style="list-style-type: circle; text-align: justify;">
                ${meal.strInstructions.split('.').map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
              </div>
              </div>
              `;
            mealList.appendChild(newMeal);
          });
        } else {
          const noResults = document.createElement('li');
          noResults.textContent = 'No results found.';
          mealList.appendChild(noResults);
        }
      })
      .catch(error => console.error(error));
  }
});

