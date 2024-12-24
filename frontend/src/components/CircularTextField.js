import { styled, TextField } from "@mui/material";

const CircularTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px", // Adjust the value as needed for the circle size
    margin: "10px",
  },
});

export default CircularTextField;
