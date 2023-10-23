"use client"
import useSWR from "swr"
import { useEffect, useState } from "react"

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
import Edit from "@/components/edit"
import EditForm from "@/components/edit-form"
import { Input } from "./ui/input"

const MainTable = () => {

    const [verified, setVerified] = useState('false')
    const [editVerified, setEditVerified] = useState(false)
    const [filtered, setFiltered] = useState([])

    const fetcher = (...args) => fetch(...args).then(res => res.json()).then( res => filter(res))
    const { data, mutate, error, isLoading } = useSWR(
        `/api/accounts`, 
        fetcher
    )

    useEffect(()=>{
        setVerified(false)
    },[])

    useEffect(()=>{
        setFiltered(data)
    },[data])

    const filter = (arr) => {
        const mergedArray = [];
        const trackingObject = {};

        for (const obj of arr) {

            const key = obj.username + obj.password;
            
            if (trackingObject[key]) {
                trackingObject[key].title += '、' + obj.title;
            } else {
                trackingObject[key] = { ...obj };
                mergedArray.push(trackingObject[key]);
            }
        }

        return mergedArray;
    }

    const handleChange = (e) => {
        if( e.target.value == '' ) {
            setFiltered(data)
        } else {
            setFiltered(data.filter( record => record.title.includes(e.target.value)))
        }
    }


    return (
    <div>
        <Input onChange={(e)=>handleChange(e)}/>
        <Table>
            <TableHeader className="border-t-2 border-b-2">
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>帳號</TableHead>
                    <TableHead>密碼</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { sessionStorage.getItem("isLogined") ? filtered?.sort((a,b) => a.title.localeCompare(b.title)).map( acc => (
                    <TableRow key={acc._id}>
                        <TableCell>{acc.title}</TableCell>
                        <TableCell>{acc.username}</TableCell>
                        <TableCell>
                            { verified ? 
                                acc.password : 
                                <TwoFA id={acc._id} verified={verified} setVerified={setVerified}/>
                            }
                        </TableCell>
                        <TableCell>
                            { editVerified ? 
                                <EditForm id={acc._id} mainMutate={mutate}/> : 
                                <Edit id={acc._id} verified={editVerified} setVerified={setEditVerified}/>
                            }
                        </TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    </div>
    );
}
 
export default MainTable;