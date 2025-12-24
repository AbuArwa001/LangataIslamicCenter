import { NextResponse } from "next/server";
import { initiateSTKPush } from "@/lib/daraja";

export async function POST(req: Request) {
    try {
        const { phone, amount } = await req.json();

        if (!phone || !amount) {
            return NextResponse.json(
                { error: "Phone number and amount are required" },
                { status: 400 }
            );
        }

        const result = await initiateSTKPush(phone, amount);

        if (result.ResponseCode === "0") {
            return NextResponse.json({ success: true, message: "STK Push initiated", data: result });
        } else {
            return NextResponse.json(
                { error: result.errorMessage || "Failed to initiate STK Push", data: result },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("API STK Push Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
