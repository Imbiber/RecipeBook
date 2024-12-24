import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";

import FormTextField from "../components/FormTextField";
import { BeatLoader } from "react-spinners";
import "./Login.css";
import chefHat from "../images/chef-hat-icon.png";
import { GET_USER_BY_LOGIN_MUTATION } from "../queries/queries";
import { useSnackbar } from "notistack";
import { useUser } from "../providers/UserProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { updateUser } = useUser(); // user context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading state

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, type) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: `${type}` });
  };

  const [getUserByLoginMutation] = useMutation(GET_USER_BY_LOGIN_MUTATION);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true to show the spinner
      setLoading(true);
      await new Promise((r) => setTimeout(r, 2000));

      // Perform the getUserByLoginMutation
      const response = await getUserByLoginMutation({
        variables: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
        },
      });

      const loggedUser = response.data.getUserByLogin;
      // User logged in successfully
      updateUser(loggedUser);

      // Redirect to home on successful login
      navigate("/");
    } catch (error) {
      showSnackbar(`${error}`, "error");
    } finally {
      // Set loading back to false after the operation is completed
      setLoading(false);
    }
  };

  return (
    <div id="login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <img id="chefHat" src={chefHat} alt="Chef Hat"></img>
      <div id="loginFormContainer">
        <div id="loginTitleContainer">
          <div id="loginTitle">
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
            <div className="blogTitle">RecipeBook</div> 
          </div>
          <div id="loginWelcome">Welcome Back!</div>
        </div>
        <div id="loginTextContainer">
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              fontFamily: '"Kalnia", serif',
            }}
          >
            Login
          </div>
          <div
            style={{
              fontFamily: '"Libre Baskerville", serif',
              fontSize: "0.925rem",
            }}
          >
            Welcome Back! Please enter your credentials below.
          </div>
        </div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <FormTextField
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ fontFamily: '"Libre Baskerville", serif' }}
            required
          />
          <FormTextField
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormTextField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "rgb(54, 69, 79)",
              borderRadius: "1rem",
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <BeatLoader
                style={{ display: "block", margin: "0 auto" }}
                size={8}
                color="white"
              />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div
          id="endText"
          style={{
            fontFamily: '"Libre Baskerville", serif',
            fontSize: "0.9rem",
            marginTop: "0.5rem",
          }}
        >
          Don't have an account?{" "}
          <a
            href="./signup"
            style={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "lightslategray",
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
