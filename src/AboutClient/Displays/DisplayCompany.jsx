import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import GeneralWebTemplate from "../../GeneralWebStructure/GeneralWebTemplate";
import PostCard from "./PostCard"; // move PostCard to its own file for clarity

import CreatePostForm from "./CreatePostForm"; // same for form
import "./DisplayCompany.css";

// ---------------- SAMPLE POSTS DATA ---------------
const initialPosts = [
  {
    id: 1,
    title: "Sunset Safari",
    date: "2024-05-20T18:30:00",
    description:
      "Join us for an unforgettable sunset safari experience, where the golden hour transforms the wild into a scene of breathtaking magic. As the sun dips below the horizon, painting the sky in vibrant hues of amber and violet, embark on a serene journey through the landscape. Witness nocturnal animals begin to stir while day-dwellers retreat, all from the comfort of our exclusive open-air vehicle. This tranquil yet thrilling adventure promises captivating wildlife sightings, stunning photography opportunities, and memories that will last a lifetime.",
    imageUrl: "/imagesFolderO/tour1.jpg",
  },
  {
    id: 2,
    title: "Bird Watching Tour",
    date: "2024-06-15T09:00:00",
    description:
      "Explore the diverse bird species in our guided bird watching tours. Join us for an unforgettable sunset safari experience, where the golden hour transforms the wild into a scene of breathtaking magic...",
    imageUrl: "/imagesFolderO/tour2.jpg",
  },
  {
    id: 3,
    title: "Night Safari Adventure",
    date: "2024-07-10T20:00:00",
    description:
      "Explore the diverse bird species in our guided bird watching tours. Join us for an unforgettable sunset safari experience...",
    imageUrl: "/imagesFolderO/tour3.jpg",
  },
];

// ---------------- THEME ----------------
const theme = createTheme({
  palette: {
    primary: { main: "#45a049" },
    secondary: { main: "#b1f990ff" },
  },
});

export default function DisplayCompany() {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const username = localStorage.getItem("username") || "User";

  // ---------------- FULL IMAGE MODAL ----------------
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setFullImageOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <GeneralWebTemplate username={username}>
        {/* ---------- Main Content Inside Template ---------- */}
        <div className="display-company-container">
          <h2 className="header-title">Events & Posts</h2>

          <div className="posts-list">
            {allPosts.map((post) => (
              <PostCard key={post.id} {...post} onImageClick={handleImageClick} />
            ))}
          </div>

          <div className="create-post-form">
            <CreatePostForm setAllPosts={setAllPosts} />
          </div>

          {/* Full Image Modal */}
          {fullImageOpen && (
            <div className="full-image-modal">
              <div className="modal-content">
                <img src={selectedImage} alt="Full View" />
                <button onClick={() => setFullImageOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </GeneralWebTemplate>
    </ThemeProvider>
  );
}
