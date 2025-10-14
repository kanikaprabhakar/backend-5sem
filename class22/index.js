const express = require("express");
const { PrismaClient } = require("@prisma/client"); // ✅ Correct import
const prisma = new PrismaClient(); // ✅ Create instance

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route")
const commentRouter = require("./routes/comment.route")


app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/comment", commentRouter)

app.listen(PORT, () => console.log("Server running on port " + PORT));