const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function postTasks(req, res) {
  try {
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        completed: req.body.completed,
        userId: req.body.userId,
        description: req.body.description,
      },
    });
    res.send(task);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
async function getTasks(req, res) {
  const user = req.user;
  console.log(user);
  try {
    // console.log(req.user);
    const tasks = await prisma.task.findMany({
      where: {
        userId: user?.id,
      },
    });
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.send(503);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { postTasks, getTasks };
