import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("M-Pesa Callback Data:", JSON.stringify(data, null, 2));

        // Here you would process the payment confirmation
        // e.g., Update database, send confirmation email, etc.
        /*
          Example Payload structure:
          {
            "Body": {
              "stkCallback": {
                "MerchantRequestID": "...",
                "CheckoutRequestID": "...",
                "ResultCode": 0,
                "ResultDesc": "The service request is processed successfully.",
                "CallbackMetadata": { ... }
              }
            }
          }
        */

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("M-Pesa Callback Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
