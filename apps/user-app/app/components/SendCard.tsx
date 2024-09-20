'use client'

import React, { useState } from 'react'
import TextInput from '@repo/ui/textinput'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import  Center  from "@repo/ui/center";
import { p2pTransfer } from '../../lib/actions/p2pTransfer'

const SendCard = () => {
    const [number,setNumber] = useState(0);
    const [sendAmount,setsendAmount] = useState(0);
  return (
    <div className='h-[90vh] '>
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setsendAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={ async() => {
                                await p2pTransfer(String(number),sendAmount);
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
  )
}

export default SendCard