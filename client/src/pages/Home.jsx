import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import burgerImg from "../assets/burger.jpg";
import tacoImg from "../assets/chicken_taco.jpg";
import macImg from "../assets/macncheese.png";
import pancakeImg from "../assets/pancakes.webp";
import pastaImg from "../assets/pasta.jpg";

function Home() {
  const [meal, setMeal] = useState(null);

  async function getMealInspiration() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting meal inspiration:", error);
    }
  }

  useEffect(() => {
    getMealInspiration();
  }, []);

  const recipes = [
    { name: "Chicken Tacos", image: tacoImg, calories: "430 cal" },
    { name: "Mac & Cheese", image: macImg, calories: "520 cal" },
    { name: "Burger", image: burgerImg, calories: "610 cal" },
    { name: "Pasta Night", image: pastaImg, calories: "580 cal" },
    { name: "Pancakes", image: pancakeImg, calories: "450 cal" },
  ];

  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Plan meals without the stress.</h1>
          <p>
            Save your favorite recipes, build grocery lists, and make meal
            planning feel cute, simple, and organized.
          </p>

          <div className="hero-buttons">
            <Link to="/add-recipe">
              <button className="btn btn-primary">Add a Recipe</button>
            </Link>

            <Link to="/dashboard">
              <button className="btn btn-secondary">View Recipes</button>
            </Link>
          </div>
        </div>

        <div className="hero-card">
          {meal ? (
            <>
              <img
                className="meal-img"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />

              <h3>Need Inspiration?</h3>
              <p>{meal.strMeal}</p>

              {meal.strSource && (
  <a
    href={meal.strSource}
    target="_blank"
    rel="noreferrer"
  >
    <button className="source-btn">
      View Full Recipe
    </button>
  </a>
)}

              <button
                className="btn btn-primary"
                onClick={getMealInspiration}
              >
                Get New Inspiration
              </button>
            </>
          ) : (
            <>
              <div className="hero-food-placeholder">🍔</div>
              <h3>Loading meal idea...</h3>
            </>
          )}
        </div>
      </section>

      <h2 className="section-title">Popular Meal Ideas</h2>

      <section className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div className="recipe-card" key={index}>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-img"
            />

            <div className="recipe-info">
              <h3>{recipe.name}</h3>
              <span>{recipe.calories}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;