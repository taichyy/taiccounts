import { NextResponse } from "next/server"

import connect from "@/lib/db"
import Account from "@/models/Account"

export const GET = async (request ,{params}) => {

    const {accountId} = params

    // Fetch
    try{
        // From utils/db.js
        await connect()
        const account = await Account.findById(accountId)
        return new NextResponse(JSON.stringify(account), {
            status: 200
        })
    }catch (err){
        return new NextResponse("Database Error", {
            status: 500,
        })
    }
}

export const PUT = async (request ,{params}) => {

    const {accountId} = params
    const body = await request.json()

    // Fetch
    try{
        // From utils/db.js
        await connect()
        await Account.findByIdAndUpdate(accountId, body)

        return new NextResponse("Account has been updated", {
            status: 200
        })
    }catch (err){
        return new NextResponse("Database Error", {
            status: 500,
        })
    }
}