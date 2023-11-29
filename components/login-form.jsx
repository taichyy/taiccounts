"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Login
    const username = e.target['username'].value
    const password = e.target['password'].value

    const data = {
      username, password
    }

    const req = await fetch('api/login', {
      body : JSON.stringify(data),
      method : "POST"
    })
    const {state} = await req.json()
    if(state == true){
      typeof window !== 'undefined' && sessionStorage.setItem('isLogined', true)
      router.push('/')
    } else if(state == false) {
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
      <CardFooter clas
      sName="flex flex-col items-end">
        <Button className='text-lg' type="submit">登入</Button>
      </CardFooter>
      </form>
    </Card>
  )
}