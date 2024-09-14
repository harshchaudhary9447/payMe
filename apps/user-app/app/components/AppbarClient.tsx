"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import  Appbar  from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import Center from "@repo/ui/center"

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar
      user={session.data?.user}  

      onSignout={async () => {
        await signOut()
            router.push("/api/auth/signin");
      }} 
      
      onSignin={async()=>{
       await signIn();
      }} />
   </div>
  );
}