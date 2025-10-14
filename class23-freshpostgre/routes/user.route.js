const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {email,name} = req.body;
    const user = await prisma.user.create({
      data:{name,email}
      
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})


router.get("/all",async (req,res)=>{
  try {
    const users = await prisma.user.findMany({
      where:{name:{startsWith:"k"}},
      orderBy:{createdAt:"asc"}
    });
    res.status(200).json({users});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;