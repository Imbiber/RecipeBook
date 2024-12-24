import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useUser } from "../providers/UserProvider";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const myRecipe = () => {
    navigate("/myRecipes");
  };
  const postRecipe = () => {
    navigate("/postBlog");
  };
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Render loading state or placeholder if user is not available yet
  if (!user) {
    return (
      <div className="navcontainer">
        <li className="navlink">
          <a href="/">Home</a>
        </li>
        <li className="navlink">
          <a href="/searchRecipes">Search</a>
        </li>
        <li className="navlink">
          <a href="/blogHome">Blogs</a>
        </li>
        <div
          style={{
            marginLeft: "2rem",
          }}
        >
          <Avatar src={<SyncLoader />} />
        </div>
      </div>
    );
  }

  // Once the user is available, render the actual content
  return (
    <div className="navcontainer">
      <li className="navlink">
        <a href="#">Home</a>
      </li>
      <li className="navlink">
        <a href="./searchRecipes">Search</a>
      </li>
      <li className="navlink">
        <a href="./blogHome">Blogs</a>
      </li>
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar alt={user.name} src={user.profile_pic} />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Stack
            alignItems="center"
            justifyContent={"center"}
            style={{
              color: "black",
              fontFamily: '"Libre Baskerville", serif',
            }}
            gap={0.5}
            pt={1}
            pb={2}
            px={2}
          >
            <Avatar
              alt={user.name}
              src={user.profile_pic}
              sx={{
                width: 56,
                height: 56,
                marginBottom: "10px",
                border: "2px solid black",
              }}
            />
            <div>{user.name}</div>
            <div style={{ fontSize: "0.85rem" }}>{user.email}</div>
          </Stack>
          <MenuItem
            onClick={myRecipe}
            style={{
              color: "black",
              fontFamily: '"Libre Baskerville", serif',
            }}
          >
            My Recipes
          </MenuItem>
          <MenuItem
            onClick={postRecipe}
            style={{
              color: "black",
              fontFamily: '"Libre Baskerville", serif',
            }}
          >
            Post Recipe
          </MenuItem>
          <MenuItem
            onClick={logOut}
            style={{
              color: "black",
              fontFamily: '"Libre Baskerville", serif',
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
