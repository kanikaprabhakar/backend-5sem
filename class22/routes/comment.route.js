const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/create",async(req,res)=>{
  try {
    const {comment,userId,postId} = req.body;
    const data = await prisma.comment.create({
      data:{
        comment,
        authorId:userId,
        postId
      }
    })
    res.status(201).json({data});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;