import express from "express"
import {PrismaClient} from '@prisma/client'
const app = express();
const client = new PrismaClient();


app.post("/hdfcWebhook", async (req,res)=>{

    const paymentInformation = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    };

    try{
            await client.$transaction([
                client.balance.updateMany({
                    where:{
                        userId : Number(paymentInformation.userId)
                    },

                    data:{
                        amount :{
                            increment : Number(paymentInformation.amount)
                        }
                    }
                }),

                client.onRampTransaction.updateMany({
                    where : {
                        token : paymentInformation.token
                    },

                    data :{
                        status : "Success",
                    }
                })
            ]);

            res.json({
                'message' : 'Captured'
            })
    }

    catch(e){
            console.log(e);
            res.status(411).json({
                message : "Error while processing webhook"
            })
    }
});

app.listen(3003);