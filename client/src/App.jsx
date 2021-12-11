import React from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostForm />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
export default App;
