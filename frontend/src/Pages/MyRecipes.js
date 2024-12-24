import React from "react";
import "./MyRecipes.css";
import { NavBar2 } from "../Navigation/NavBar2";
import { Typography, Slide, Grid } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@apollo/client";
import { useUser } from "../providers/UserProvider";
import { GET_RECIPE_BY_USER_ID_QUERY } from "../queries/queries";
import { Helmet } from "react-helmet-async";

const MyRecipes = () => {
  const { user } = useUser();
  console.log(user);

  const { loading, error, data } = useQuery(GET_RECIPE_BY_USER_ID_QUERY, {
    variables: { user_id: user.id },
  });

  return (
    <>
      <Helmet>
        <title>My Recipes</title>
      </Helmet>
      <NavBar2 />
      <div id="MyRecipesContainer">
        <Typography id="myRecipesTitle">My Recipes</Typography>
        <div id="myRecipesCards">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Grid
              container
              marginTop={1}
              rowSpacing={2}
              columnSpacing={10}
              justifyContent="center"
              alignItems="center"
            >
              {data.getRecipeByUserId.map((recipe, index) => (
                <Slide
                  key={index}
                  in={true}
                  direction="left"
                  timeout={{ enter: 100 * index, exit: 0 }}
                >
                  <Grid item key={index}>
                    <BlogCard
                      title={recipe.title}
                      description={recipe.description}
                      imageUrl={recipe.thumbnail}
                      userId={recipe.user_id}
                      creation_date={recipe.creation_date}
                      id={recipe.id}
                    />
                  </Grid>
                </Slide>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default MyRecipes;
