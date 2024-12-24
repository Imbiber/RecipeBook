import React from "react";
import "./BlogCard.css";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID_QUERY } from "../queries/queries";

const BlogCard = ({
  id,
  title,
  description,
  imageUrl,
  userId,
  creation_date,
}) => {
  const { loading, data } = useQuery(GET_USER_BY_ID_QUERY, {
    variables: { user_id: userId },
  });

  const navigate = useNavigate();

  // Convert the timestamp string to a number
  const timestamp = parseInt(creation_date, 10);

  const handleCardClick = () => {
    navigate(`../recipe/${id}`);
  };

  // Create a Date object using the timestamp
  const date = new Date(timestamp);

  // Format the date to "27th August, 2016"
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div className="blogCardContainer">
      <Card
        sx={{
          maxWidth: 325,
          minWidth: 325,
          marginY: "1rem",
          borderRadius: "0.75rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
        }}
        onClick={handleCardClick}
      >
        <CardMedia sx={{ height: 200 }} image={imageUrl} title={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              fontFamily: '"Libre Baskerville", serif',
              fontWeight: "600",
            }}
          >
            {title}
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
              WebkitLineClamp: 4,
              maxWidth: "100%",
              fontFamily: '"Roboto Slab", serif',
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={3} justifyContent="left" mx={3} my={2}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Avatar
                alt={data.getUserById.name}
                src={data.getUserById.profile_pic}
              />
              <div
                style={{
                  textAlign: "left",
                  fontFamily: '"Roboto Slab", serif',
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                <div>{data.getUserById.name}</div>
                <div>{formattedDate}</div>
              </div>
            </>
          )}
        </Stack>
      </Card>
    </div>
  );
};

export default BlogCard;
