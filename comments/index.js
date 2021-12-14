const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[postId] = comments;

    await axios.post("http://localhost:5000/events", {
      type: "COMMENT_CREATED",
      id: commentId,
      data: content,
      postId,
    });

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", (req, res) => {
  console.log(req.body.type);

  res.send({});
});

const PORT = 4002 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`posts server running on PORT ${PORT}`);
});
