const express = require("express");
//const formidableMiddleware = require("express-formidable");
const app = express();

const path = require("path");

const cors = require("cors");

app.use(express.json());

//app.use(formidableMiddleware());

app.use(cors());

app.use("/uploads/images", express.static(path.join("uploads", "images")));
const db = require("./models");

//Routers

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");

app.use("/comments", commentsRouter);

const imageRouter = require("./routes/Image");

app.use("/image", imageRouter);

const usersRouter = require("./routes/Users");

app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");

app.use("/likes", likesRouter);

const stateRouter = require("./routes/State");

app.use("/state", stateRouter);

const doctorRouter = require("./routes/Doctor");

app.use("/doctor", doctorRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
