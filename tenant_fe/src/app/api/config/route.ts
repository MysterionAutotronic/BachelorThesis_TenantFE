'use server'

import { NextResponse } from 'next/server';

if (!process.env.CONFIG_ENDPOINT) console.error('environment variable CONFIG_ENDPOINT not defined');
const endpoint = process.env.CONFIG_ENDPOINT!;

export async function GET() {
    try {
        const response = await fetch(endpoint, {
            method: 'GET'
        });
        const data = await response.json();
        return new NextResponse(JSON.stringify(data), { status: response.status });
    } catch (error) {
        console.error('Proxy request failed:', error);
        return new NextResponse('Internal Server Error trying to reach ' + endpoint, { status: 500 });
    }
}