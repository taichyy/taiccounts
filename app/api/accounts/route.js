import { NextResponse } from "next/server"

import connect from "@/lib/db"
import Account from "@/models/Account"

// Name must be route.js
export const GET = async (request) => {
    try {
        await connect()

        const accounts = await Account.find()

        return new NextResponse(JSON.stringify(accounts), {
            status: 200
        })
    } catch (error) {
        return new NextResponse("Error fetching: "+error, {
            status: 500
        })
    }
}