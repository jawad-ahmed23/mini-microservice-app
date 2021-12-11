import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentForm";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4001/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div>
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div style={{ display: "flex" }}>{renderedPosts}</div>;
};

export default PostList;
