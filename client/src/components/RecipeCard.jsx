// This component was originally created to be a reusable recipe card
// for displaying recipe information throughout the app.
//
// As the project expanded, I decided to render recipe cards directly
// inside Home.jsx and Dashboard.jsx so I could move faster and focus on
// completing required features like CRUD functionality,
// authentication, and external API integration.

function RecipeCard() {
  return (
    <div>

      {/* Placeholder recipe title */}
      <h3>Recipe Name</h3>

      {/* Placeholder ingredients section */}
      <p>Ingredients will show here.</p>

    </div>
  );
}

// Exports component so it could be reused in future updates
export default RecipeCard;