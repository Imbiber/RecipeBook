import React from "react";
import "./ViewRecipe.css";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import {
  GET_RECIPE_BY_ID_QUERY,
  GET_USER_BY_ID_QUERY,
} from "../queries/queries";
import { NavBar2 } from "../Navigation/NavBar2";
import { Helmet } from "react-helmet-async";

const ViewRecipe = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { loading: recipeLoading, data: recipeData } = useQuery(
    GET_RECIPE_BY_ID_QUERY,
    {
      variables: {
        recipe_id: recipeId,
      },
    }
  );

  const { loading: userLoading, data: userData } = useQuery(
    GET_USER_BY_ID_QUERY,
    {
      variables: {
        user_id: recipeData?.getRecipeById?.user_id || null,
      },
      skip:
        !recipeData ||
        !recipeData.getRecipeById ||
        !recipeData.getRecipeById.user_id,
    }
  );

  if (recipeLoading || userLoading) {
    return <div>Loading...</div>;
  }

  const { title, recipe, description, thumbnail, creation_date } =
    recipeData.getRecipeById;

  const formatDate = (curr_date) => {
    // Convert the timestamp string to a number
    const timestamp = parseInt(curr_date, 10);
    // Create a Date object using the timestamp
    const date = new Date(timestamp);

    // Format the date to "27th August, 2016"
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  const showTooltip = () => {
    document.getElementById("usertooltip").style.display = "block";
  };

  const hideTooltip = () => {
    document.getElementById("usertooltip").style.display = "none";
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavBar2 />
      <div
        style={{
          display: "flex",
          alignItems: "left",
          marginBottom: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Button
          onClick={() => {
            navigate("/viewBlogs");
          }}
        >
          <KeyboardBackspaceIcon style={{ fontSize: "2rem", color: "black" }} />
        </Button>
      </div>
      {userLoading ? (
        <div>User Loading..</div>
      ) : (
        <div
          className="information"
          style={{
            textAlign: "left",
            fontFamily: '"Libre Baskerville", serif',
            fontWeight: "bolder",
            fontSize: "0.9rem",
            marginLeft: "2rem",
          }}
        >
          <div style={{ marginBottom: "0.75rem" }}>
            Recipe By:{" "}
            <span
              style={{ color: "gray", margin: "0.5rem" }}
              id="username"
              onMouseOver={showTooltip}
              onMouseOut={hideTooltip}
            >
              {userData.getUserById.name}
            </span>
            <div id="usertooltip">
              <p>Name: {userData.getUserById.name}</p>
              <p>Email: {userData.getUserById.email}</p>
              <p>
                Registered On:{" "}
                {formatDate(userData.getUserById.registration_date)}
              </p>
            </div>
          </div>
          <div>Created On: {formatDate(creation_date)}</div>
        </div>
      )}
      <div className="viewRecipeContainer">
        <Typography
          variant="h5"
          style={{
            fontFamily: '"Libre Baskerville", serif',
            fontWeight: "bolder",
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <div id="recipeThumbnail">
          <img
            alt={title}
            src={thumbnail}
            style={{
              aspectRatio: 1.2,
              width: "max(250px, 35%)",
              padding: "1rem",
              marginTop: "1rem",
              border: "3px dashed black",
              borderRadius: "2rem",
            }}
          />
        </div>
        <div id="recipeContent">
          <div
            id="recipeDescription"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: '"Libre Baskerville", serif',
                fontWeight: "bolder",
                marginBottom: "1rem",
              }}
            >
              Description:
            </Typography>
            <div style={{ fontSize: "1.05rem" }}>{description}</div>
          </div>
          <div
            id="recipeRecipe"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: '"Libre Baskerville", serif',
                fontWeight: "bolder",
                marginBottom: "1rem",
              }}
            >
              Recipe:
            </Typography>
            <div
              id="recipeInstructions"
              style={{ fontSize: "1.05rem" }}
              dangerouslySetInnerHTML={{ __html: recipe }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
