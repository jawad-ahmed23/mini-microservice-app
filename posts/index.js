const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const { title } = req.body;
    const id = randomBytes(4).toString("hex");

    posts[id] = {
      id,
      title,
    };

    await axios.post("http://localhost:5000/events", {
      type: "POST_CREATED",
      data: {
        id,
        title,
      },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/events", (req, res) => {
  console.log(req.body.type);

  res.send({});
});

const PORT = 4001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`posts server running on PORT ${PORT}`);
});
