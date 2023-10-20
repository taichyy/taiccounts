"use client"
import useSWR from "swr"
import { useEffect, useState } from "react"
import { EyeOff } from "lucide-react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TwoFA from "@/components/two-f-a"

const MainTable = () => {

    const [verified, setVerified] = useState('false')

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(
        `/api/accounts`, 
        fetcher
    )

    useEffect(()=>{
        setVerified(false)
    },[])

    const handlePwd = () => {
        if( !verified ){

        }
    }


    return (
    <div>
        <Table>
            <TableHeader className="border-t-2 border-b-2">
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>帳號</TableHead>
                    <TableHead>密碼</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map( acc => (
                    <TableRow key={acc._id}>
                        <TableCell>{acc.title}</TableCell>
                        <TableCell>{acc.username}</TableCell>
                        <TableCell>
                            {verified ? acc.password : <TwoFA id={acc._id} verified={verified} setVerified={setVerified}/>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div onClick={()=>handleClick()}>
            left
        </div>
    </div>
    );
}
 
export default MainTable;