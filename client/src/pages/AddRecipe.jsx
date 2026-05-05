import { useState } from "react";
import axios from "axios";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://yumplan-backend.onrender.com/api/recipes",
        recipe
      );

      console.log(response.data);

      alert("Recipe saved successfully!");

      setRecipe({
        title: "",
        ingredients: "",
        instructions: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error saving recipe");
    }
  }

  return (
    <main className="page">
      <h1 className="section-title">Add a Recipe</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe name"
          value={recipe.title}
          onChange={handleChange}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        ></textarea>

        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-primary">Save Recipe</button>
      </form>
    </main>
  );
}

export default AddRecipe;