"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import {PrismaClient} from "@prisma/client"
export async function p2pTransfer(to:string, amount:number)
{
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    try{
        if(!from){
            return {
                message : "Error while sending user is not logged in"
            }
        }
    
        const toUser = await prisma.user.findFirst({
            where:{
                PhoneNumber : to
            }
        })
    
        if(!toUser)
        {
            return {
                message : "User not found"
            }
        }
            await prisma.$transaction(
                async (tx) =>{
                    const fromBalance = await tx.balance.findUnique({
                        where :{
                            userId : Number(from)
                        }
                    });
    
                    if(!fromBalance || fromBalance.amount<amount)
                    {
                        throw new Error("Insufficent funds");
                    }
    
                    await tx.balance.update({
                        where :{
                            userId : Number(from),
                        },
                        data:{
                            amount: {decrement:amount}
                        },
                    })
    
                    await tx.balance.update({
                        where :{
                            userId : Number(toUser.id),
                        },
                        data:{
                            amount: {increment:amount}
                        },
                    })
                }
            )
         
    }
    catch(e)
    {
        console.log(e);
        return {
            message:"Error"
        }
    }
    

}