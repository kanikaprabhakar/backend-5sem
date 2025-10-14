const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {email,name} = req.body;
    const user = await prisma.user.create({
      data:{name,email,
        posts:{
          create:{
            title:"first post",
            content:"this is my first post when user created"
          }
        }
      }
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;