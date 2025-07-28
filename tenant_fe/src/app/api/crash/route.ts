'use server'

import { NextRequest, NextResponse } from 'next/server';

if (!process.env.CRASH_ENDPOINT) console.error('environment variable CRASH_ENDPOINT not defined');
const endpoint = process.env.CRASH_ENDPOINT!;

export async function GET(req: NextRequest) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user': req.headers.get('user') || ''
            }
        });
        return new NextResponse(response.body, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'text/plain',
                'Cache-Control': 'no-store',
            }
        });
    } catch (error) {
        console.error('Crash request failed:', error);
        return new NextResponse('Internal Server Error trying to reach ' + endpoint, { status: 500 });
    }
}