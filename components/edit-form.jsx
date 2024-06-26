"use client"
import { PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EditForm = ({id, mainMutate}) => {

    const [msg, setMsg] = useState("")

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(
        `/api/accounts/${id}`, 
        fetcher
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const title = e.target.title.value
        const username = e.target.username.value
        const password = e.target.password.value

        const obj = {
            title : title,
            username : username,
            password : password
        }

        try{
            await fetch(`/api/accounts/${id}`,{
                method:"PUT",
                body: JSON.stringify(obj)
            })
            mutate()
            mainMutate()
            toast.success("更改成功！")
        } catch (err) {
            console.log(err)
        }
    } 

    const handleDelete = async() => {
        if(confirm("確定要刪除嗎？")){
            try{
                await fetch(`/api/accounts/${id}`,{
                    method:"DELETE",
                })
                mutate()
                mainMutate()
                toast.success("刪除成功！")
            } catch (err) {
                console.log(err)
            }
        }
    }
        
    return (
        <Dialog>
            <DialogTrigger>
                <PenBoxIcon />
            </DialogTrigger>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <DialogTitle>更改資料</DialogTitle>
                    { isLoading ? "Loading......" : (
                        <form onSubmit={(e)=>handleSubmit(e)} className=" text-left">
                            <div>
                                <h2>項目名稱</h2>
                                <Input name="title" className="mt-2 w-[600px]" defaultValue={data?.title}/>
                            </div>
                            <div>
                                <h2>帳號</h2>
                                <Input name="username" className="mt-2" defaultValue={data?.username}/>
                            </div>
                            <div>
                                <h2>密碼</h2>
                                <Input name="password" className="mt-2" defaultValue={data?.password}/>
                            </div>
                            <DialogClose asChild>
                                <Button type="submit" className="mt-4 w-full">
                                    確定編輯
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="destructive" className="mt-4 w-full" onClick={()=>handleDelete()}>
                                    刪除
                                </Button>
                            </DialogClose>
                        </form>
                    )}
                </DialogHeader>
                <DialogDescription className="text-red-700">{msg}</DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
 
export default EditForm;