import { NextResponse } from "next/server"

import connect from "@/lib/db"
import KeyAccount from "../../../models/Key-account"

// Name must be route.js
export const GET = async (request) => {

    try {
        await connect()

        const keyAccounts = await KeyAccount.find()

        return new NextResponse(JSON.stringify(keyAccounts), {
            status: 200
        })
    } catch (error) {
        return new NextResponse("Error fetching: "+error, {
            status: 500
        })
    }

}