"use client"

import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {

  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(()=>{
    setIsMounted(true)
  },[])
  
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate, error, isLoading } = useSWR(
    `/api/keyaccounts`, 
    fetcher
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if( e.target['username'].value == data[0].username && e.target['password'].value == data[0].password) {
      sessionStorage.setItem("isLogined", true)
    }
    if(sessionStorage.getItem("isLogined")){
      router.push('/')
    }else{
      router.push('/login')
    }
  }

  if(!isMounted){
    return null
  }

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>太成網</CardTitle>
      </CardHeader>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <CardContent>
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="username" className='text-base'>帳號</Label>
              <Input id="username" placeholder=""/>
            </div>
            <span className='h-4' />
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="password" className='text-base'>密碼</Label>
              <Input id="password" type="password" placeholder="" />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex flex-col items-end">
        <Button className='text-lg' type="submit">登入</Button>
      </CardFooter>
      </form>
    </Card>
  )
}