import { useState, useRef } from "react";
import { NavBar2 } from "../Navigation/NavBar2";
import { useMutation } from "@apollo/client";
import { TextField, Button, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import Quill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./PostBlog.css";
import { ADD_RECIPE_MUTATION } from "../queries/queries";
import { useSnackbar } from "notistack";
import { useUser } from "../providers/UserProvider";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const PostBlog = () => {
  const { user } = useUser();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  // code for snackbar

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, type) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: `${type}` });
  };

  const quillRef = useRef(null);

  // Control the thumbnail input
  const [thumbnailNameDisplay, setThumbnailNameDisplay] = useState("");
  const [loading, setLoading] = useState(false);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const [addRecipeMutation] = useMutation(ADD_RECIPE_MUTATION);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    description: "",
    ingredients: "",
    recipe: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For file input, use 'files' property to get the selected file
    const inputValue = value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertFileToBase64(file);
    setFormData({
      ...formData,
      thumbnail: base64Image,
    });

    setThumbnailNameDisplay(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Process images in the Quill editor
    const quill = quillRef.current.getEditor();
    const delta = quill.getContents();

    // Create a copy of formData
    let updatedFormData = { ...formData };

    // Upload images and update the formData
    const updatedDelta = await processImages(delta);
    updatedFormData.recipe = quill.root.innerHTML;

    // Upload thumbnail and update the formData
    const thumbnailURL = await uploadImageToImgBB(formData.thumbnail);
    updatedFormData.thumbnail = thumbnailURL;

    // Update the form data in the state
    setFormData(updatedFormData);

    // Submit the form data to the GraphQL API using Apollo Client
    try {
      const response = await addRecipeMutation({
        variables: {
          userId: user.id, // Replace with the actual user ID
          title: updatedFormData.title,
          description: updatedFormData.description,
          thumbnail: updatedFormData.thumbnail,
          recipe: updatedFormData.recipe,
        },
      });

      showSnackbar("Recipe posted successfully!", "success");

      // Reset the form after submission
      setFormData({
        title: "",
        thumbnail: "",
        description: "",
        ingredients: "",
        recipe: "",
      });
      setThumbnailNameDisplay("");
    } catch (error) {
      showSnackbar("Some Error Occurred!", "error");
      console.error("Error submitting form data to Apollo Client:", error);
    } finally {
      // Set loading to false after the submission is complete (whether successful or not)
      setLoading(false);
    }
  };

  const handleRecipeChange = (value) => {
    setFormData({
      ...formData,
      recipe: value,
    });
    // console.log(value);
  };

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

  const processImages = async (delta) => {
    const quill = quillRef.current.getEditor();
    const updatedDelta = { ...delta };

    // Helper function to convert an image to base64
    const convertImageToBase64 = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error converting image to base64:", error);
        showSnackbar("Some Error Occurred!", "error");
        // throw new Error("Failed to convert image to base64");
      }
    };

    // Iterate through the delta to find and process image elements
    for (let i = 0; i < updatedDelta.ops.length; i++) {
      if (updatedDelta.ops[i].insert && updatedDelta.ops[i].insert.image) {
        // Extract the image data
        const imageData = updatedDelta.ops[i].insert.image;

        // Check if the image is a base64 data URI (local)
        if (imageData.startsWith("data:image")) {
          // Convert the local image to base64
          try {
            const base64Image = await convertImageToBase64(imageData);

            // Upload the base64 image to ImgBB and replace the source
            const imgbbURL = await uploadImageToImgBB(base64Image);
            updatedDelta.ops[i].insert.image = imgbbURL; // Update the image source in the delta
          } catch (error) {
            console.error("Error processing local image:", error);
          }
        } else {
          // The image is an external URL, upload it to ImgBB and replace the source
          try {
            const imgbbURL = await uploadImageToImgBB(imageData);
            updatedDelta.ops[i].insert.image = imgbbURL; // Update the image source in the delta
          } catch (error) {
            console.error("Error processing external image:", error);
          }
        }
      }
    }
    // Update the Quill editor with the modified delta
    quill.setContents(updatedDelta);
    return updatedDelta;
  };

  return (
    <>
      <Helmet>
        <title>Post a Recipe</title>
      </Helmet>
      <NavBar2 />
      <div id="postBlog">
        <Typography component={"div"} variant="h5" id="postBlogTitle">
          Elevate Our Recipe Collection with Your Flavorful Creations!
        </Typography>
        <div id="blogPostFormContainer">
          <form id="blogPostForm" onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              maxRows={3}
              required
            />

            <Quill
              ref={quillRef}
              value={formData.recipe}
              onChange={handleRecipeChange}
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Enter Your Recipe Here! (Start with Ingredients)"
              style={{ height: "200px", marginBottom: "5.2rem" }}
            />

            <label htmlFor="file" className="file-style">
              <CloudUploadOutlined sx={{ fontSize: "2.5rem" }} />
              <p>
                {thumbnailNameDisplay.length > 0
                  ? thumbnailNameDisplay
                  : "Upload Thumbnail"}
              </p>
            </label>
            <input type="file" id="file" onChange={handleFileChange} required />

            <Button variant="contained" type="submit">
              {loading ? <BeatLoader color="white" size={8} /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;
