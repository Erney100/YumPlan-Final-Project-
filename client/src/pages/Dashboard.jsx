import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  async function getRecipes() {
    try {
      const response = await axios.get("https://yumplan-backend.onrender.com/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
      alert("Error loading recipes");
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  async function deleteRecipe(id) {
    try {
      await axios.delete(`https://yumplan-backend.onrender.com/api/recipes/${id}`);
      alert("Recipe deleted!");
      getRecipes();
    } catch (error) {
      console.error(error);
      alert("Error deleting recipe");
    }
  }

  function startEditing(recipe) {
    setEditingId(recipe.id);

    setEditRecipe({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
  }

  function handleEditChange(e) {
    setEditRecipe({
      ...editRecipe,
      [e.target.name]: e.target.value,
    });
  }

  async function saveEdit(id) {
    try {
      await axios.put(`https://yumplan-backend.onrender.com/api/recipes/${id}`, editRecipe);

      alert("Recipe updated!");

      setEditingId(null);
      getRecipes();
    } catch (error) {
      console.error(error);
      alert("Error updating recipe");
    }
  }

  return (
    <main className="page">
      <h1 className="section-title">Your Saved Recipes</h1>

      <section className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <div className="recipe-img">🍽️</div>

            {editingId === recipe.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editRecipe.title}
                  onChange={handleEditChange}
                />

                <textarea
                  name="ingredients"
                  value={editRecipe.ingredients}
                  onChange={handleEditChange}
                ></textarea>

                <textarea
                  name="instructions"
                  value={editRecipe.instructions}
                  onChange={handleEditChange}
                ></textarea>

                <button
                  className="btn btn-primary"
                  onClick={() => saveEdit(recipe.id)}
                >
                  Save
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <span>{recipe.favorite ? "❤️" : "♡"}</span>
                </div>

                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>

                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => startEditing(recipe)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Dashboard;