import { useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import "./RecipeGeneration.css";
import { NavBar2 } from "../Navigation/NavBar2";
import FormTextField from "../components/FormTextField";
import { BeatLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";

const RecipeGeneration = () => {
  const [ingredients, setIngredients] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, type) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: `${type}` });
  };

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  function formatList(inputString) {
    // Split the input string into an array
    const values = inputString.split(",");
    const trimmedValues = values.map((value) => value.trim());

    // Check the number of values
    const length = trimmedValues.length;

    if (length === 0) {
      return "";
    } else if (length === 1) {
      return trimmedValues[0];
    } else if (length === 2) {
      return `${trimmedValues[0]} and ${trimmedValues[1]}`;
    } else {
      // If more than two values, add "and" before the last value
      const lastValue = trimmedValues.pop();
      const joinedString = trimmedValues.join(", ");
      return `${joinedString}, and ${lastValue}`;
    }
  }

  const handleGenerateRecipe = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/generate-recipe`,
        {
          inputs: `The list of ingredients and the recipe with the following ingredients: ${formatList(
            ingredients
          )} is as follows: `,
        }
      );
      if (response.data.error) throw Error(response.data.error);
      setGeneratedRecipe(response.data[0].generated_text);
    } catch (error) {
      showSnackbar("Internal Server Problem. Please try again later.", "error");
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recipe Generation</title>
      </Helmet>
      <NavBar2 />
      <div id="RecipeGenerationContainer">
        <Typography component={"div"} id="recipeGenerationTitle">
          Unleash your culinary creativity with our personalized recipe
          generator!
        </Typography>
        <div id="generatorContainer">
          <FormTextField
            id="ingredients"
            label="Enter Ingredients"
            placeholder="The ingredients must be comma-seperated for proper recipe generation!"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
            value={ingredients}
            onChange={handleInputChange}
            InputProps={{ style: { fontFamily: '"Roboto Slab", serif' } }}
            InputLabelProps={{ style: { fontFamily: '"Roboto Slab", serif' } }}
          />

          <Button
            id="generateButton"
            variant="contained"
            onClick={handleGenerateRecipe}
            disabled={loading}
            sx={{
              marginTop: 2,
              backgroundColor: "#1B1212",
              borderRadius: "1rem",
              fontWeight: "bold",
              fontFamily: '"Roboto Slab", serif',
            }}
          >
            {loading ? (
              <BeatLoader
                style={{ display: "block", margin: "0 auto" }}
                size={8}
                color="white"
              />
            ) : (
              "Generate Recipe"
            )}
          </Button>

          <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
            {generatedRecipe.length > 0 && (
              <div sx={{ marginTop: 2, textAlign: "left" }}>
                <Typography
                  style={{
                    fontFamily: '"Roboto Slab", serif',
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    margin: "1rem",
                  }}
                >
                  Generated Recipe:
                </Typography>
                <Typography
                  component={"pre"}
                  dangerouslySetInnerHTML={{
                    __html: generatedRecipe.replace(
                      /(Ingredients:|Instructions:)/g,
                      (match) =>
                        `<div id="recipeGenerationHeadings">${match}</div>`
                    ),
                  }}
                  style={{
                    textAlign: "left",
                    fontFamily: '"Roboto Slab", serif',
                    textWrap: "wrap",
                  }}
                ></Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeGeneration;
