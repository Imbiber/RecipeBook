import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import FormTextField from "../components/FormTextField";
import { BeatLoader } from "react-spinners";
import { CloudUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import "./Signup.css";
import chefHat from "../images/chef-hat-icon.png";
import { CREATE_USER_MUTATION } from "../queries/queries";
import { useSnackbar } from "notistack";
import { useUser } from "../providers/UserProvider";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { updateUser } = useUser(); // user context

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading state

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, type) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: `${type}` });
  };

  // Control the thumbnail input
  const [profilePicture, setProfilePicture] = useState("");
  const [loadingPicture, setLoadingPicture] = useState(false);

  const uploadImageToImgBB = async (base64Image) => {
    try {
      const imgbbResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/upload-to-imgbb`,
        {
          image: base64Image,
        }
      );

      // Handle the response and return the image URL
      if (
        imgbbResponse.data &&
        imgbbResponse.data.data &&
        imgbbResponse.data.data.url
      ) {
        return imgbbResponse.data.data.url;
      } else {
        showSnackbar("Some Error Occurred!", "error");
        // throw new Error("Failed to get image URL from the ImgBB response");
      }
    } catch (error) {
      showSnackbar("Some Error Occurred!", "error");
      // throw new Error("Failed to upload image to ImgBB");
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    setLoadingPicture(true);
    const file = e.target.files[0];
    const base64Image = await convertFileToBase64(file);
    const profileUrl = await uploadImageToImgBB(base64Image);
    setFormData({
      ...formData,
      profilePicture: profileUrl,
    });
    setLoadingPicture(false);
    setProfilePicture(file.name);
  };

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const checkPasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password),
    };

    setPasswordStrength(strength);
  };

  const getPasswordCriteriaMessage = () => {
    const criteria = [
      "At least 8 characters",
      "At least one uppercase letter",
      "At least one lowercase letter",
      "At least one number",
      "At least one special character",
    ];

    const factors = [
      "length",
      "uppercase",
      "lowercase",
      "number",
      "specialChar",
    ];

    const unsatisfiedCriteria = criteria.filter((criterion) => {
      return !passwordStrength[factors[criteria.indexOf(criterion)]];
    });

    return unsatisfiedCriteria.length > 0
      ? `Password should meet the following criteria: ${unsatisfiedCriteria.join(
          ", "
        )}`
      : "";
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture:
      "https://i.ibb.co/3krVF2w/chef-hat-logo-icon-vector-600nw-2297100465.webp",
  });

  // Use the useMutation hook to define the createUser mutation
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") checkPasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation, for example, check if passwords match
    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

    if (!isPasswordStrong) {
      showSnackbar(getPasswordCriteriaMessage(), "error");
      return;
    }

    try {
      // Set loading to true to show the spinner
      setLoading(true);
      await new Promise((r) => setTimeout(r, 3000));

      // Perform the createUser mutation
      const response = await createUserMutation({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile_pic: formData.profilePicture,
        },
      });

      const createdUser = response.data.createUser;

      // User created successfully
      updateUser(createdUser);

      // Redirect to "/home" on successful login
      navigate("/");
    } catch (error) {
      showSnackbar(`${error}`, "error");
    } finally {
      // Set loading back to false after the operation is completed
      setLoading(false);
    }

    // Optionally, you can redirect the user to another page after successful login
  };

  return (
    <div id="signup">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <img id="chefHat" src={chefHat}></img>
      <div id="signupFormContainer">
        <div id="signupTitleContainer">
          <div id="signupTitle">
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
          </div>
          <div id="signupWelcome">Welcome!</div>
        </div>
        <div id="signupTextContainer">
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              fontFamily: '"Kalnia", serif',
            }}
          >
            Sign Up
          </div>
          <div
            style={{
              fontFamily: '"Libre Baskerville", serif',
              fontSize: "0.925rem",
            }}
          >
            Welcome! Please enter your credentials below.
          </div>
        </div>
        <form id="signupForm" onSubmit={handleSubmit}>
          <FormTextField
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              fontFamily: '"Libre Baskerville", serif',
            }}
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
          <FormTextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="file"
            className="file-style"
            style={{ padding: "0.35rem" }}
          >
            <CloudUploadOutlined sx={{ fontSize: "2rem" }} />
            <p>
              {loadingPicture
                ? "Loading..."
                : profilePicture.length > 0
                ? profilePicture
                : "Upload Picture"}
            </p>
          </label>
          <input type="file" id="file" onChange={handleFileChange} />
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
              "Sign Up"
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
          Already have an account?{" "}
          <a
            href="./login"
            style={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "lightslategray",
            }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
