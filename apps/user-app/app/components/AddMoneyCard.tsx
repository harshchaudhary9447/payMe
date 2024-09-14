"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import Center from "@repo/ui/center"
import Select from "@repo/ui/select"
import { useState } from "react"
import  TextInput  from "@repo/ui/textinput"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const AddMoneyCard = () => {
    const [redirectUrl , setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  return (
    <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={()=>{

            }}/>

        </div>

        <div className="py-4 text-left">
                Bank
        </div>
        <Select options={SUPPORTED_BANKS} onSelect={(value)=>{
            setRedirectUrl(SUPPORTED_BANKS.find( x => x.name === value)?.redirectUrl || "");
        }}>

        </Select>
        <div className="flex justify-center pt-4">
            <Button onClick={()=>{
                window.location.href = redirectUrl || "";
            }}>
                Add Money
            </Button>
        </div>
       
    </Card>

  )
}

export default AddMoneyCard