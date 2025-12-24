export async function getAccessToken() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    if (!consumerKey || !consumerSecret) {
        throw new Error("Missing M-Pesa Consumer Key or Secret");
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.errorMessage || "Failed to get access token");
        }

        return data.access_token;
    } catch (error) {
        console.error("Error getting M-Pesa access token:", error);
        throw error;
    }
}

export async function initiateSTKPush(phoneNumber: string, amount: number) {
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL; // IMPORTANT: Must be HTTPS and public

    if (!businessShortCode || !passkey || !callbackUrl) {
        throw new Error("Missing M-Pesa Configuration (Shortcode, Passkey, or Callback URL)");
    }

    const token = await getAccessToken();

    // Timestamp format: YYYYMMDDHHmmss
    const date = new Date();
    const timestamp = date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0') +
        date.getHours().toString().padStart(2, '0') +
        date.getMinutes().toString().padStart(2, '0') +
        date.getSeconds().toString().padStart(2, '0');

    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString("base64");

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const body = {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // Or CustomerBuyGoodsOnline
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: businessShortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: "LangataIslamic",
        TransactionDesc: "Donation"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error initiating STK push:", error);
        throw error;
    }
}
