import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');
    const path = request.nextUrl.searchParams.get('path');
    const secret = request.nextUrl.searchParams.get('secret');

    // Security check
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (tag) {
        revalidateTag(tag, { expire: 0 });
        return NextResponse.json({ revalidated: true, now: Date.now(), tag });
    }

    if (path) {
        revalidatePath(path, 'page');
        return NextResponse.json({ revalidated: true, now: Date.now(), path });
    }

    return NextResponse.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing tag or path',
    });
}
