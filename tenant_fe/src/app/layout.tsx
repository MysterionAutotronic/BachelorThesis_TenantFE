import './globals.css';
import type { Metadata } from 'next';
import { ConfigSchema } from '@mystiker123/config-schema';
import ConfigProvider from '@/lib/ConfigProvider';

export const dynamic = 'force-dynamic'; // Force dynamic rendering to avoid fetching config at build time

async function loadConfig() {
    const base = process.env.INTERNAL_BASE_URL || 'http://127.0.0.1:3000';
    const url = new URL('/api/config', base).toString();  // <- absolute to proxy (server side component)
    const res  = await fetch(url, { next: { revalidate: 60*10 } });
    if (!res.ok) throw new Error('Failed to load config');
    const json = await res.json();
    const parsed = ConfigSchema.parse(json);
    return parsed;
}

export const metadata: Metadata = { title: 'Tenant FE' };

export default async function RootLayout(
    { children }: { children: React.ReactNode },
) {
    const cfg = await loadConfig();

    return (
        <html lang="en">
            <body>
                <ConfigProvider cfg={cfg}>
                    {children}
                </ConfigProvider>
            </body>
        </html>
    );
}
