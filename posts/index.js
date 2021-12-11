const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

const PORT = 4001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`posts server running on PORT ${PORT}`);
});
