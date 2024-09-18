import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaClient} from '@prisma/client';
import bcrypt from "bcrypt";

const client = new PrismaClient();
export const authOptions = {
  providers :[
    CredentialsProvider({
      name:'Credentaials',
      
      credentials: {
        email : {label:"Email", type:"text", placeholder:"Enter your Email address"},
        name : {label:"Name", type:"text", placeholder:"Enter your Name"},
        password : {label:"Password",type:"password",placeholder:"Enter your password"},
        phonenumber : {label:"Phone Number",type:"text",placeholder:"Enter your Phone Number"}
      },

      async authorize(credentials:any){
          const hashedPassword = await bcrypt.hash(credentials.password,10);
          const existingPassword = await client.user.findFirst({
            where:{
              email : credentials.email
            }
          })

          if(existingPassword){
            const passwordValidation = await bcrypt.compare(credentials.password,existingPassword.password);
            if(passwordValidation)
            {
              console.log("I am signed in");
              return {
                id:existingPassword.id.toString(),
                name:existingPassword.email,
              }
            }

            return null;
          }

          try {
            const user = await client.user.create({
              data: {
                email: credentials.email,
                name: credentials.name,
                password: hashedPassword,
                PhoneNumber: credentials.phonenumber,
              }
            });

            const balance = await client.balance.create({
              data :{
                userId:Number(user.id),
                amount :0,
                locked: 0
              }
            })
            return {
              id : user.id.toString(),
              email : user.email

            }
          }

          catch (e) {
            console.error("Error during login:", e);
          }
          

          return null
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks:{
    async jwt({token,user}:any){
      if(user){
        token.id = user.id,
        token.phonenumber = user.phonenumber
      }
      return token;
    },

  async session({session,token}:any)
  {
    if (token) {
      session.user.id = token.id;
      session.user.phonenumber = token.phonenumber;
    }
    return session
  }
},
}
