const express = require("express");
const { verifyToken } = require("../middlewears/authorizations");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specified methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specified headers
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const userRouter = require("../routes/users");
app.use("/users", userRouter);

const taskRouter = require("../routes/tasks");
app.use("/tasks", verifyToken, taskRouter);
