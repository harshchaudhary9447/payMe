"use server"

import { getServerSession } from "next-auth";
import {authOptions} from "../auth"
import {PrismaClient} from '@prisma/client';


export async function createOnRampTransaction(amount:number,provider:string)
{   
    const client = new PrismaClient();
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if(!userId)
        {
            return {
                message : "User not logged in"
            }
        }

        client.onRampTransaction.create({
            data :{
                userId,
                amount:amount*100,
                status:"Processing",
                startTime : new Date(),
                provider,
                token:Math.random().toString(),
            }
        })

        
}