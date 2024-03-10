"use client"
import useSWR from "swr"
import { useEffect, useState } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TwoFA from "@/components/two-f-a"
import Edit from "@/components/edit"
import EditForm from "@/components/edit-form"
import { Input } from "./ui/input"

export const dynamic = 'force-dynamic'

const MainTable = () => {

    const [verified, setVerified] = useState('false')
    const [editVerified, setEditVerified] = useState(false)
    const [filtered, setFiltered] = useState([])

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(
        `/api/accounts`, 
        fetcher,{
            refreshInterval : 0,
        },
        false
    )

    useEffect(()=>{
        setVerified(false)
    },[])

    useEffect(()=>{
        setFiltered(data)
    },[data])
    
    useEffect(()=>{
        if(verified == true || editVerified == true) {
            setVerified(true)
            setEditVerified(true)
        }
    },[verified, editVerified])

    const handleChange = (e) => {
        if( e.target.value == '' ) {
            setFiltered(data)
        } else {
            setFiltered(
                data.filter( 
                    record => 
                        record.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
                        record.username.toLowerCase().includes(e.target.value.toLowerCase())
                    ))
        }
    }


    return (
    <div>
        {typeof window !== 'undefined' && sessionStorage.getItem("isLogined") ? (
            <>
            <Input onChange={(e)=>handleChange(e)}/>
            <Table>
                <TableHeader className="border-t-2 border-b-2">
                    <TableRow>
                        <TableHead className="w-fit"></TableHead>
                        <TableHead className="w-fit">帳號</TableHead>
                        <TableHead className=" whitespace-nowrap">密碼</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { filtered?.sort((a,b) => a.title.localeCompare(b.title)).map( acc => (
                        <TableRow key={acc._id}>
                            <TableCell className="w-fit">
                                {acc.title.split('、').map( (line, index) => (
                                    <span key={index}>
                                        {line }
                                        {index == acc.title.split('、').length-1 ? '' : '、'}
                                        <br/>
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell className="w-fit">{acc.username}</TableCell>
                            <TableCell>
                                { verified ? 
                                    acc.password : 
                                    <TwoFA id={acc._id} verified={verified} setVerified={setVerified} />
                                }
                            </TableCell>
                            <TableCell>
                                { editVerified ? 
                                    <EditForm id={acc._id} mainMutate={mutate} /> : 
                                    <Edit id={acc._id} verified={editVerified} setVerified={setEditVerified} />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </>
        ) : null}
    </div>
    );
}
 
export default MainTable;