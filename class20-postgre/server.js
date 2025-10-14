const express = require("express");
const prisma = require("./prisma/client");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
  const user = {
    name:"kanika",
    email:"kanika@gmail.com"
  }
  let userRes = await prisma.user.create({
    data:user
  })
  res.status(200).json(userRes);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));