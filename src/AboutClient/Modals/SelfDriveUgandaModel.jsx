import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

// Styles for main modal (bigger)
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxWidth: "95vw",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

// Styles for full-image modal
const fullImageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 2,
};

export default function SelfDriveUganda({ open, handleClose }) {
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const posts = [
    {
      title: "Bugati Adventure",
      desc: "3 days self drive package in Murchison Falls.",
      img: "../imagesFolderO/landrover1.jpg",
      rating: 4.8,
      costPerDay: 350,
    },
    {
      title: "BMW Safari",
      desc: "Weekend safari offer in Entebbe.",
      img: "../imagesFolderO/CarBMW.jpg",
      rating: 4.5,
      costPerDay: 250,
    },
    {
      title: "GTR Orange Tour",
      desc: "Drive the GTR Orange through Kampala streets.",
      img: "../imagesFolderO/CarGTROrange.jpg",
      rating: 4.7,
      costPerDay: 300,
    },
    {
      title: "Volkswagen RoadTrip",
      desc: "Scenic drive with Volkswagen across Uganda.",
      img: "../imagesFolderO/CarVolskwagen.jpg",
      rating: 4.2,
      costPerDay: 180,
    },
  ];

  const handleViewClick = (img) => {
    setSelectedImage(img);
    setFullImageOpen(true);
  };

  return (
    <>
      {/* Main Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            Self Drive Uganda — AVAILABLE CARS
          </Typography>

          <Stack spacing={3}>
            {posts.map((post, index) => {
                return (
                    <Card key={index} sx={{ display: "flex" }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 300, // increased width
                                borderRadius: 1.5, // slightly curved corners
                                objectFit: "cover" // ensures the image fills the width nicely
                            }}
                            image={post.img}
                            alt={post.title} />
                        {/* <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={post.img}
              alt={post.title}
            /> */}
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.desc}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Rating: {post.rating} ★
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cost per day: ${post.costPerDay}
                            </Typography>

                            <Stack direction="row" spacing={1} mt={2}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    onClick={() => handleViewClick(post.img)}
                                >
                                    View
                                </Button>
                                <Button variant="contained" size="small" color="success">
                                    Book
                                </Button>
                                <Button variant="contained" size="small" color="success">
                                    Request Car
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                );
            })}
          </Stack>

          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ width: "100%", mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Full Image Modal */}
      <Modal
        open={fullImageOpen}
        onClose={() => setFullImageOpen(false)}
        aria-labelledby="full-image"
        aria-describedby="full-size-car"
      >
        <Box sx={fullImageStyle}>
          <img
            src={selectedImage}
            alt="Full Car"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
          <Button
            variant="outlined"
            sx={{ mt: 1, width: "100%" }}
            onClick={() => setFullImageOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
