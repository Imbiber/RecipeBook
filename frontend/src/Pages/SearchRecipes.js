import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import "./SearchRecipes.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Grid, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { NavBar2 } from "../Navigation/NavBar2";
import Cook from "../images/cooking.json";
import CircularTextField from "../components/CircularTextField";
import { Helmet } from "react-helmet-async";

const SearchRecipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeData, setRecipeData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&addRecipeInformation=true`
        );
        const data = await response.json();
        data.results.forEach((result) => {
          let ingredients = [];
          const recipeSteps = [];

          // Extract ingredients
          result.analyzedInstructions[0].steps.forEach((step) => {
            step.ingredients.forEach((ingredient) => {
              ingredients.push(ingredient.name || []);
            });
          });
          ingredients = [...new Set(ingredients)];

          // Extract recipe steps
          result.analyzedInstructions[0].steps.forEach((step) => {
            recipeSteps.push(step.step || []);
          });
          result["ingredients"] = ingredients;
          result["recipeSteps"] = recipeSteps;
          return result;
        });

        setRecipeData(data.results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    // Fetch recipes only if there's a search term
    if (searchTerm.trim() !== "") {
      fetchRecipes();
    } else {
      // Clear the recipe data if the search term is empty
      setRecipeData([]);
    }
  }, [searchTerm]);

  return (
    <>
      <Helmet>
        <title>Search Recipes!</title>
      </Helmet>
      <NavBar2 />
      <div className="SearchRecipes">
        <CircularTextField
          variant="outlined"
          placeholder="Search..."
          sx={{
            borderRadius: "50%",
            width: "max(300px, 55%)",
            "& .MuiOutlinedInput-adornedEnd": {
              paddingRight: 0,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {searchTerm.trim() !== "" ? (
            <Grid
              container
              marginTop={1}
              rowSpacing={2}
              columnSpacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {recipeData.map((recipe, index) => (
                <Grid item key={index}>
                  <div className="cardContainer">
                    <RecipeCard
                      name={recipe.title}
                      imageUrl={recipe.image}
                      summary={recipe.summary}
                      readyInMinutes={recipe.readyInMinutes}
                      servings={recipe.servings}
                      ingredients={recipe.ingredients}
                      steps={recipe.recipeSteps}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Player
                  src={Cook}
                  className="player"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
                <Typography my={3} variant="h5" fontFamily={"cursive"}>
                  Search and Cook!
                </Typography>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRecipes;
