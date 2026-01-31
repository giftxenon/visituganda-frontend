import { useState } from "react";
import {
  FaBell,
  FaSignOutAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaThumbsUp,
  FaComment,
} from "react-icons/fa";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  InputBase,
  Badge,
  IconButton,
  styled,
  alpha,
  Modal,
} from "@mui/material";
import "./DisplayCompany.css";

// Create theme at top level
const theme = createTheme({
  palette: {
    common: {
      white: "#ffffff",
    },
    primary: {
      main: "#45a049",
    },
    secondary: {
      main: "#b1f990ff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  transitions: {
    create: (props) => props,
  },
  breakpoints: {
    up: (breakpoint) => `@media (min-width: ${breakpoint})`,
  },
});

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
      "Explore the diverse bird species in our guided bird watching tours.oin us for an unforgettable sunset safari experience, where the golden hour transforms the wild into a scene of breathtaking magic. As the sun dips below the horizon, painting the sky in vibrant hues of amber and violet, embark on a serene journey through the landscape. Witness nocturnal animals begin to stir while day-dwellers retreat, all from the comfort of our exclusive open-air vehicle. This tranquil",
    imageUrl: "/imagesFolderO/tour2.jpg",
  },
  {
    id: 3,
    title: "Night Safari Adventure",
    date: "2024-07-10T20:00:00",
    description:
      "Explore the diverse bird species in our guided bird watching tours.oin us for an unforgettable sunset safari experience, where the golden hour transforms the wild into a scene of breathtaking magic. As the sun dips below the horizon, painting the sky in vibrant hues of amber and violet, embark on a serene journey through the landscape. Witness nocturnal animals begin to stir while day-dwellers retreat, all from the comfort of our exclusive open-air vehicle. This tranquil",
    imageUrl: "/imagesFolderO/tour3.jpg",
  },
];

// ---------------- MUI SEARCH & ICONS ----------------
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "25%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// ---------------- APP BAR ------------------------
const AppBarComponent = () => {
  return (
    <header className="app-bar">
      <div
        className="toolbar"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="../../imagesFolderO/ugMap.png"
            alt="Visit Uganda Logo"
            style={{ width: "70px" }}
          />
          <Typography variant="h4" color="white">
            Visit Uganda
          </Typography>
        </Box>

        {/* ---------------- MUI SEARCH BAR ---------------- */}
        <Search>
          <SearchIconWrapper>
            <svg width="20" height="20" fill="white">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" fill="none" />
              <line x1="14" y1="14" x2="20" y2="20" stroke="white" strokeWidth="2" />
            </svg>
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
      </div>
    </header>
  );
};

// ---------------- SIDEBAR ------------------------
const Sidebar = () => {
  const averageRating = 4.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (averageRating >= i) stars.push(<span key={i} className="star filled">★</span>);
      else if (averageRating >= i - 0.5) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star">☆</span>);
    }
    return stars;
  };

  return (
    <aside className="sidebar">
      <img src="/imagesFolderO/bestSafari.jpg" alt="Company" className="avatar" />
      <div className="rating">
        <div className="stars">{renderStars()}</div>
        <span className="rating-text">{averageRating} / 5</span>
      </div>
      <h2 className="title-company">Best Safari Lodge</h2>
      <h2 className="sidebar-title">We Provide the Best</h2>
      <nav className="nav-buttons">
        <button className="nav-button">View Profile</button>
        <button className="nav-button">Feedback</button>
        <button className="nav-button">Contact Support</button>
        <button className="nav-button">Chat with Client</button>
      </nav>
    </aside>
  );
};

// ---------------- POST CARD ------------------------
const PostCard = ({ title, date, description, imageUrl, onImageClick }) => {
  const postDate = new Date(date);
  const formattedDate = postDate.toLocaleDateString();
  const formattedTime = postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="post-card">
      <div className="post-content">
        <img
          src={imageUrl}
          alt={title}
          className="post-image"
          style={{ cursor: "pointer" }}
          onClick={() => onImageClick(imageUrl)}
        />
        <div className="post-text">
          <h3 className="post-title">{title}</h3>
          <p className="post-date">{`${formattedDate} at ${formattedTime}`}</p>
          <p className="post-description">{description}</p>
        </div>
      </div>
      <div className="post-interactions">
        <button className="interaction-button like">
          <FaThumbsUp /> Likes
        </button>
        <button className="interaction-button comment">
          <FaComment /> Comment
        </button>

        <div className="post-actions">
          <button className="action-button view" style={{ color: "blue" }}>
            <FaEye />
          </button>
          <button className="action-button edit" style={{ color: "green" }}>
            <FaEdit />
          </button>
          <button className="action-button delete" style={{ color: "red" }}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- CREATE POST FORM ------------------------
const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CreatePostForm = ({ setAllPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [poster, setPoster] = useState(null);

  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) setPoster(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !startDate || !poster) {
      return alert("Please fill in all fields and upload a poster.");
    }
    const imageUrl = URL.createObjectURL(poster);
    setAllPosts((prev) => [
      {
        id: Date.now(),
        title,
        date: startDate,
        description,
        imageUrl,
      },
      ...prev,
    ]);
    setTitle("");
    setDescription("");
    setStartDate("");
    setPoster(null);
    alert("Post submitted successfully!");
  };

  return (
    <Box sx={{ width: "95%", p: 2, borderLeft: "2px solid #ddd" }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <UploadButton variant="contained" component="label" startIcon={<CloudUploadIcon />}>
              Upload Poster
              <input type="file" hidden accept="image/*" onChange={handlePosterChange} />
            </UploadButton>
            {poster && <Typography sx={{ mt: 1 }}>Selected: {poster.name}</Typography>}
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

// ---------------- FULL IMAGE MODAL ------------------------
const FullImageModal = ({ open, handleClose, imageUrl }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        maxHeight: "100vh",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 2,
        overflowY: "auto",
      }}
    >
      <img
        src={imageUrl}
        alt="Full View"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <Button variant="outlined" sx={{ mt: 2, width: "100%" }} onClick={handleClose}>
        Close
      </Button>
    </Box>
  </Modal>
);

// ---------------- MAIN COMBINED LAYOUT ------------------------
const DisplayCompany = () => {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setFullImageOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <AppBarComponent />
        <div className="content">
          <Sidebar />
          <main className="main-section">
            <h2
              className="header-title"
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Events & Posts
            </h2>
            <div className="posts-list">
              {allPosts.map((post) => (
                <PostCard key={post.id} {...post} onImageClick={handleImageClick} />
              ))}
            </div>
          </main>
          <div style={{ flex: 1 }}>
            <CreatePostForm setAllPosts={setAllPosts} />
          </div>
        </div>

        {/* Full Image Modal */}
        <FullImageModal
          open={fullImageOpen}
          handleClose={() => setFullImageOpen(false)}
          imageUrl={selectedImage}
        />
      </div>
    </ThemeProvider>
  );
};

export default DisplayCompany;
