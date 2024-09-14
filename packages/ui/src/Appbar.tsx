"use client"
import { Button } from "./button";


interface AppbarProps {
    user?:{
        name?:string | null;
    };
    onSignin : () => any;
    onSignout : () => Promise<void>;
}
const Appbar = ({user,onSignout,onSignin}:AppbarProps) => {

    const handleClick = async () =>{
        if(user)
        {
            await onSignout();
        }
        else{
            await onSignin();
        }
    }
  return (
    <div className="flex justify-between border-b-8 px-4 border-slate-300">
        <div className="text-lg flex flex-col justify-center">
            Paytm
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={handleClick}>{user ? "Logout" : "Log In"}</Button>
        </div>
    </div>
  )
}

export default Appbar