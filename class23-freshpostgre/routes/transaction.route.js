const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post("/transfer", async (req, res) => {
    try {
        const {senderId, receiverId, amount} = req.body;
        const transaction =  await prisma.$transaction(async (tx) => {
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

            const transaction = await tx.transaction.create({
                data:{
                    amount,
                    senderId,
                    recieverId: receiverId
                }
            })

            return transaction;
            
    })

    res.status(200).json(transaction);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


module.exports = router;