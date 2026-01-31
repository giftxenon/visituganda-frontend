import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardActionArea, CardContent, Typography, Grid } from "@mui/material";
import PostModal from "./PostModal.jsx";

const postsData = {
  "Roadtrip Africa": [
    { id: 1, title: "Toyota Rav4 Safari Tour", summary: "Explore Uganda by road." },
    { id: 2, title: "Land Cruiser Roof Tent", summary: "Camp on the rooftop!" },
  ],
  "4X4 Car Hire Kampala": [
    { id: 3, title: "Weekend 4X4 Deal", summary: "Adventure awaits." },
  ],
  "Self Drive Uganda": [
    { id: 4, title: "Self Drive Gorilla Tour", summary: "Drive deep into Bwindi." },
  ],
};

export default function DisplayCompany() {

  const { companyName } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const posts = postsData[companyName] || [];

  return (
    <div style={{ padding: 30 }}>

      <h1>{companyName} Posts</h1>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <Card>
              <CardActionArea onClick={() => setSelectedPost(post)}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{post.summary}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <PostModal
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

    </div>
  );
}
