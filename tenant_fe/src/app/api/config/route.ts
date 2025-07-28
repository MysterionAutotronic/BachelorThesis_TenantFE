'use server'

import { NextRequest, NextResponse } from 'next/server';

if (!process.env.CONFIG_ENDPOINT) console.error('environment variable CONFIG_ENDPOINT not defined');
const endpoint = process.env.CONFIG_ENDPOINT!;

export async function GET(req: NextRequest) {
    const body = await req.json();

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user': body.user
            }
        });
        const data = await response.json();
        return new NextResponse(JSON.stringify(data), { status: response.status });
    } catch (error) {
        console.error('Proxy request failed:', error);
        return new NextResponse('Internal Server Error trying to reach ' + endpoint, { status: 500 });
    }
}