"use client"
import { usePathname,useRouter } from 'next/navigation'
import React from 'react'

const SidebarItem = ({href,title,icon}:{href: string,title:string,icon:any}) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname==href;
  
    return (
    <div className={`flex ${selected ? 'text-[#6a51a6]' : 'text-slate-500'} cursor-pointer
    ` } onClick={()=>router.push(href)}>
        <div className='pr-2'>
            {icon}
        </div>
        <div className={`flex ${selected ? 'text-[#6a51a6]' : 'text-slate-500'}`}>
            {title}
        </div>
    </div>
  )
}

export default SidebarItem