const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post("/transfer", async (req, res) => {
    try {
        const {senderId, receiverId, amount} = req.body;
        return await prisma.$transaction(async (tx) => {
            const sender = await tx.user.findUnique({
                where: {id: senderId}
            })

            if(!sender || sender.balance < amount){
                throw new Error("Insufficient balance");
            }

            await tx.user.update({
                where: {id: senderId},
                data:{balance:{decrement:amount}}
            })

            // const receiver = await tx.user.findUnique

            await tx.user.update({
                where: {id: receiverId},
                data:{balance:{increment:amount}}
            })

            
    })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


module.exports = router;