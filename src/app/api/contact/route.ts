import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { first_name, last_name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Langata Islamic Center <admin@langataislamiccenter.org>',
            to: ['info@langataislamiccenter.org'],
            subject: `New Contact Message from ${first_name} ${last_name}`,
            replyTo: email,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${first_name} ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error('Error sending email:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
