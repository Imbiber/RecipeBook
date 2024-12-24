import React, { useEffect } from "react";
import "./Home.css";
import { NavBar } from "../Navigation/NavBar";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import CookingPng from "../images/cooking.png";
import FindPng from "../images/search.png";
import LeftOverPng from "../images/leftovers.png";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("user");
    if (!logged) {
      navigate("/login");
    }
  }, []);

  const { user } = useUser();

  return (
    <div className="Home">
      <Helmet>
        <title>RecipeBook</title>
      </Helmet>
      <NavBar />
      <div className="content">
        <div className="headlineContainer">
          <div style={{ position: "relative" }}>
            <div id="steam">
              <div
                className="wavy-line wavy-line-green"
                data-text="xxxxxxxxxxxxxx"
              ></div>
              <div
                className="wavy-line wavy-line-blue"
                data-text="xxxxxxxxxxxxxx"
              ></div>
              <div
                className="wavy-line wavy-line-yellow"
                data-text="xxxxxxxxxxxxxx"
              ></div>
            </div>
            <div id="headline">
              RecipeBook: Your One-stop Destination for Easy and Delicious
              Recipes!
              <Typography
                fontSize={"1.25rem"}
                component={"div"}
                fontFamily={"'Kalnia', serif"}
                mt={3}
              >
                Welcome to RecipeBook—your go-to for quick, tasty recipes!
                Whether you're a novice or a seasoned chef, find easy-to-follow
                instructions and delicious dishes to elevate your culinary
                experience. Explore, cook, and savor delightful meals with
                RecipeBook!
              </Typography>
            </div>
          </div>
        </div>
        <div className="featureCards">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={10}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Card
                sx={{
                  maxWidth: 300,
                  borderRadius: "1.5rem",
                  backgroundColor: "#FCF5E5",
                  border: "5px solid #36454F",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    navigate("/viewBlogs");
                  }}
                >
                  <div
                    style={{
                      height: "110px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px",
                        height: "fit-content",
                        width: "fit-content",
                        borderRadius: "100%",
                        background: "rgb(58,180,156)",
                        background:
                          "linear-gradient(90deg, rgba(58,180,156,1) 0%, rgba(69,252,148,1) 100%)",
                      }}
                    >
                      <img
                        style={{ aspectRatio: 1, height: "55px" }}
                        src={CookingPng}
                      />
                    </div>
                  </div>
                  <CardContent>
                    <Typography
                      fontSize={"1.25rem"}
                      component={"div"}
                      fontWeight="bold"
                      fontFamily={"'Kalnia', serif"}
                    >
                      Share and Explore!
                    </Typography>
                    <Typography
                      variant="body2"
                      color="darkslategrey"
                      fontFamily={'"Roboto Slab", serif'}
                      style={{ textWrap: "pretty", marginTop: "1rem" }}
                    >
                      Embark on a delightful culinary journey with our
                      Recipebook community, where passionate food enthusiasts
                      worldwide come together to share, explore, and savor a
                      diverse array of delectable dishes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  maxWidth: 300,
                  borderRadius: "1.5rem",
                  backgroundColor: "#FCF5E5",
                  border: "5px solid #36454F",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    navigate("/searchRecipes");
                  }}
                >
                  <div
                    style={{
                      height: "110px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "17px",
                        height: "fit-content",
                        width: "fit-content",
                        borderRadius: "100%",
                        background: "rgb(58,102,180)",
                        background:
                          "linear-gradient(90deg, rgba(58,102,180,1) 0%, rgba(69,233,252,1) 100%)",
                      }}
                    >
                      <img
                        style={{ aspectRatio: 1, height: "48px" }}
                        src={FindPng}
                      />
                    </div>
                  </div>
                  <CardContent>
                    <Typography
                      fontSize={"1.25rem"}
                      component={"div"}
                      fontWeight="bold"
                      fontFamily={"'Kalnia', serif"}
                    >
                      Discover!
                    </Typography>
                    <Typography
                      variant="body2"
                      color="darkslategrey"
                      fontFamily={'"Roboto Slab", serif'}
                      style={{ textWrap: "pretty", marginTop: "1rem" }}
                    >
                      Explore an array of ready-made recipes! Easily find the
                      perfect dish to suit your taste and preferences. Cooking
                      inspiration is just a search away!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  maxWidth: 300,
                  borderRadius: "1.5rem",
                  backgroundColor: "#FCF5E5",
                  border: "5px solid #36454F",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    navigate("/generateRecipe");
                  }}
                >
                  <div
                    style={{
                      height: "110px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px",
                        height: "fit-content",
                        width: "fit-content",
                        borderRadius: "100%",
                        background: "rgb(180,138,58)",
                        background:
                          "linear-gradient(90deg, rgba(180,138,58,1) 0%, rgba(211,252,69,1) 100%)",
                      }}
                    >
                      <img
                        style={{ aspectRatio: 1, height: "55px" }}
                        src={LeftOverPng}
                      />
                    </div>
                  </div>
                  <CardContent>
                    <Typography
                      fontSize={"1.25rem"}
                      component={"div"}
                      fontWeight="bold"
                      fontFamily={"'Kalnia', serif"}
                    >
                      Recipe Generation!
                    </Typography>
                    <Typography
                      variant="body2"
                      color="darkslategrey"
                      fontFamily={'"Roboto Slab", serif'}
                      style={{ textWrap: "pretty", marginTop: "1rem" }}
                    >
                      Simply input the ingredients you have, and let our website
                      transform your kitchen into a culinary haven by providing
                      personalized recipes tailored to your available
                      ingredients.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
