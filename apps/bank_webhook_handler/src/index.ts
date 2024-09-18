import express from "express"
import {PrismaClient} from '@prisma/client'
const app = express();
const client = new PrismaClient();

app.use(express.json());
app.post("/hdfcWebhook", async (req:any,res:any)=>{

    const paymentInformation = {
        token: req?.body?.token,
        userId: Number(req?.body?.user_identifier), // Ensure this is a number
        amount: Number(req?.body?.amount) // Convert amount to a number
    };
   
    try {

        console.log(paymentInformation.amount+ "Amount");
        await client.$transaction([
            // Remove `await` from individual queries within the transaction
            client.balance.updateMany({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    },
                },
            }),
    
            client.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            })
        ]);
    
        // If successful, respond with the captured message
        res.json({
            message: 'Captured',
        });
    } catch (e) {
        // Catch any errors from the transaction
        console.log(e); // Log the error to help with debugging
        res.status(500).json({
            message: "Error while processing webhook",
        });
    }
})    

app.listen(3003);