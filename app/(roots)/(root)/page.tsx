"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import AddForm from "@/components/add-form"
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
    <div className='w-full pt-10 px-4 md:w-3/4 md:mx-auto'>
      {
        typeof window !== 'undefined' && sessionStorage.getItem('isLogined') && (
          <>
            <nav className='flex justify-end mb-4 space-x-2'>
              <AddForm />
              <Button onClick={()=>handleClick()}>登出</Button>
            </nav>
            <MainTable/>
          </>
        )
      }
    </div>
  )
}
