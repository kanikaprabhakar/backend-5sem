const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post('/create/bulk', async (req, res) => {
    try {
        const { courses } = req.body;
        const allCourses = await prisma.course.createMany({
            data:courses,
            skipDuplicates:true
        })
        res.status(200).json({allCourses});
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})


router.post("/enrollment", async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const enrollment = await prisma.enrollment.create({
            data: {
                userId,
                courseId
            }
        });
        res.status(200).json({ enrollment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



router.get("/enrollments", async (req, res) => {
    try {
        const allEnrollments = await prisma.enrollment.findMany({
            include: {
                user: true,
                course: true
            }
        });
        res.status(200).json({ allEnrollments });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})




module.exports = router;