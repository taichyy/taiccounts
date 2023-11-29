"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import MainTable from '@/components/main-table'


export default function Home() {

  const router = useRouter()

  if(typeof window !== 'undefined' && !sessionStorage.getItem('isLogined') ) {
    router.push('/login')
  }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const handleClick = () => {
    typeof window !== 'undefined' && sessionStorage.removeItem("isLogined")
    router.push('/login')
  }
  
  if(!isMounted) {
    return null
  }

  return (
    <div className='w-full pt-10 px-4 md:w-3/4 md:mx-auto' style={isMounted ? {opacity: 1} : {opacity:0}}>
      <nav className='flex justify-end mb-4'>
        <Button onClick={()=>handleClick()}>登出</Button>
      </nav>
      <MainTable/>
    </div>
  )
}
