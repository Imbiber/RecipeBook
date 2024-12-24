import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { NavBar2 } from "../Navigation/NavBar2";
import { Grid, Button } from "@mui/material";
import BlogCard from "../components/BlogCard";
import "./BlogHome.css";
import { GET_ALL_RECIPES_QUERY } from "../queries/queries";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Helmet } from "react-helmet-async";

const BlogHome = () => {
  const { loading, data, error } = useQuery(GET_ALL_RECIPES_QUERY);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Recipe Blogs</title>
      </Helmet>
      <NavBar2 />
      <div className="BlogHome">
        <div className="blogBanner">
          <div id="welcome">Welcome to</div>
          <div id="steam">
            <div
              class="wavy-line wavy-line-green"
              data-text="xxxxxxxxxxxxxx"
            ></div>
            <div
              class="wavy-line wavy-line-blue"
              data-text="xxxxxxxxxxxxxx"
            ></div>
            <div
              class="wavy-line wavy-line-yellow"
              data-text="xxxxxxxxxxxxxx"
            ></div>
          </div>
          <div className="blogTitle">RecipeBook!</div>
          <div id="welcomeText">
            Your digital kitchen companion for culinary inspiration! Dive into a
            world of flavors, where simple ingredients transform into
            extraordinary dishes. From quick bites to gourmet delights, our blog
            is your recipe haven. Join us on a delicious journey, where every
            post is a step towards creating memorable meals. Happy cooking!{" "}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              fontFamily: '"Roboto Slab", serif',
              fontSize: "0.85rem",
              color: "rebeccaPurple",
              fontWeight: "bold",
            }}
          >
            <div
              id="blogHomePost"
              onClick={() => {
                navigate("../postBlog");
              }}
              style={{ margin: "auto" }}
            >
              Post a new Recipe?
            </div>
          </div>
        </div>
        <div id="recentPosts">
          <div
            style={{
              fontFamily: '"Roboto Slab", serif',
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Our Most Recent Posts:{" "}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Grid
              container
              marginTop={1}
              rowSpacing={2}
              columnSpacing={5}
              justifyContent="center"
              alignItems="center"
            >
              {data.getAllRecipes
                .toSorted((a, b) => {
                  return b.creation_date - a.creation_date;
                })
                .slice(0, 3)
                .map((recipe, index) => (
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
                ))}
              <Grid item>
                <Button
                  className="viewAllButton"
                  variant="outlined"
                  onClick={() => {
                    navigate("/viewBlogs");
                  }}
                  endIcon={<ArrowForwardIosIcon />}
                  style={{
                    backgroundColor: "#EFEBEB",
                    color: "gray",
                    borderColor: "white",
                    borderRadius: "3rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  View All
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogHome;
