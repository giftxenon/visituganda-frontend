import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

export default function PostModal({ open, post, onClose }) {

  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");

  if (!post) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>{post.title}</DialogTitle>

      <DialogContent>

        <Typography>{post.summary}</Typography>

        <IconButton onClick={() => setLikes(likes + 1)}>
          <FavoriteIcon />
        </IconButton>
        {likes} Likes

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write comment"
          sx={{ mt: 2 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => alert("Comment submitted")}
        >
          Post Comment
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => alert("Booking completed")}
        >
          Book this tour
        </Button>

      </DialogContent>

    </Dialog>
  );
}
