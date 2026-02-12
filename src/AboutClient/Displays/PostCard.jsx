import React from "react";
import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./DisplayCompany.css";

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
          onClick={() => onImageClick(imageUrl)}
          style={{ cursor: "pointer" }}
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

export default PostCard;
