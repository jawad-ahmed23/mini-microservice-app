import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:4001/posts", {
        title,
      });

      setTitle("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Create post:</label>
      <br />
      <input
        style={{
          marginTop: "10px",
        }}
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="submit"
        style={{
          marginTop: "10px",
        }}
      />
    </form>
  );
}
