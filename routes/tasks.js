const express = require("express");
const router = express.Router();
const { postTasks, getTasks } = require("../controllers/taskController");

router.post("/", postTasks);
router.get("/", getTasks);

module.exports = router;
