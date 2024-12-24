import { useState, useEffect } from "react";
import "./ViewBlogs.css";
import { NavBar2 } from "../Navigation/NavBar2";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
} from "@mui/material";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECIPES_QUERY } from "../queries/queries";
import CircularTextField from "../components/CircularTextField";
import { Helmet } from "react-helmet-async";

const ViewBlogs = () => {
  const { loading, data } = useQuery(GET_ALL_RECIPES_QUERY);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [showCards, setShowCards] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredAndSortedRecipes =
    data?.getAllRecipes
      ?.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "latest") {
          return b.creation_date - a.creation_date;
        } else {
          return a.creation_date - b.creation_date;
        }
      }) || [];

  useEffect(() => {
    // Trigger animation when data changes
    setShowCards(true);
  }, [filteredAndSortedRecipes]);

  return (
    <>
      <Helmet>
        <title>Recipe Blogs</title>
      </Helmet>
      <NavBar2 />
      <div className="viewBlogContainer">
        <div id="searchAndSort">
          <CircularTextField
            variant="outlined"
            placeholder="Search..."
            sx={{
              borderRadius: "50%",
              "& .MuiOutlinedInput-adornedEnd": {
                paddingRight: 0,
              },
            }}
            style={{
              width: "50%",
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
          <FormControl
            variant="outlined"
            style={{ marginLeft: "1rem", marginTop: "0.9rem" }}
          >
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort Order"
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="posts">
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
              {filteredAndSortedRecipes.map((recipe, index) => (
                <Slide
                  key={index}
                  in={showCards}
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

export default ViewBlogs;
