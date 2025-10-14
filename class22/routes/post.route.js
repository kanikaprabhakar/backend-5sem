const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/create",async(req,res)=>{
  try {
    const {title,content,userId} = req.body;
    const post = await prisma.post.create({
      data:{
        title,
        content,
        authorId:userId
      }
    })
    res.status(201).json({post});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.get("/all",async(req,res)=>{
  try {
    // const allPosts = await prisma.post.findMany({
    //   include:{
    //     author:true,
    //     comments:true
    //   }
    // });
    const allPosts = await prisma.post.findMany({
      include:{
        author:true,
        comments:{
          include:{author:true}
        }
      }
    });
    res.status(200).json({allPosts})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.put("/update/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const updatedPost = await prisma.post.update({
      where: { id }, // Don't use parseInt for UUID
      data: { title, content }
    });
    res.status(200).json({ updatedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// const allPosts = await prisma.post.createMany({
//   data: postMessage,
// });



module.exports = router;