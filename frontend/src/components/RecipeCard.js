import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, Box, Stack, Chip, List, ListItem } from "@mui/material";
import "./RecipeCard.css";

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const RecipeModal = ({
  name,
  imageUrl,
  summary,
  readyInMinutes,
  servings,
  ingredients,
  steps,
}) => {
  const plainTextSummary = convertHtmlToPlainText(summary);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
    width: "min(875px, 95%)",
    maxHeight: "94vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    borderRadius: "0.5rem",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 0,
  };

  const colorNames = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
  ];

  // Function to generate a random integer between min and max (inclusive)
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Function to get a random color name from the array
  const getRandomColorName = () =>
    colorNames[getRandomInt(0, colorNames.length - 1)];

  return (
    <>
      <div className="cardContainer" onClick={handleOpen}>
        <Card sx={{ maxWidth: 300, minWidth: 300 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={imageUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                WebkitLineClamp: 3,
                maxWidth: "100%",
              }}
            >
              {plainTextSummary}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box className="modalImageContainer">
              <div style={{ backgroundImage: `url(${imageUrl})` }}></div>
            </Box>
            <Box px={2.5}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Kalnia', serif",
                  mt: 2,
                  fontSize: "1.25rem",
                  textAlign: "center",
                }}
              >
                {name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                  <strong>Ready in:</strong> 30 minutes{" "}
                  {/* Replace with actual value */}
                </div>
                <div>
                  <strong>Serving Size:</strong> 4{" "}
                  {/* Replace with actual value */}
                </div>
                <Box>
                  <strong>Ingredients:</strong>
                  <Stack
                    direction={"row"}
                    spacing={0.75}
                    mb={1}
                    maxWidth={"100%"}
                    flexWrap={"wrap"}
                  >
                    {ingredients.map((ingredient, index) => (
                      <div style={{ marginTop: "4px" }} key={index}>
                        <Chip
                          sx={{
                            borderColor: `${getRandomColorName()}`,
                            borderWidth: "2px",
                          }}
                          label={
                            <Typography fontWeight="550" fontSize="0.85rem">
                              {ingredient}
                            </Typography>
                          }
                          variant={"outlined"}
                        />
                      </div>
                    ))}
                  </Stack>
                </Box>
                <Box maxHeight={"200px"} overflow={"auto"} mt={2}>
                  <strong>Recipe:</strong>
                  <div>
                    <ol>
                      {steps.map((step, index) => (
                        <li key={index} style={{ listStyleType: "number" }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RecipeModal;
