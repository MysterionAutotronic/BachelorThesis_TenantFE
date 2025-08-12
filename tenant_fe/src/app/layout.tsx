import './globals.css';
import type { Metadata } from 'next';
import { ConfigSchema } from '@mystiker123/config-schema';
import ConfigProvider from '@/lib/ConfigProvider';

export const dynamic = 'force-dynamic'; // Force dynamic rendering to avoid fetching config at build time

async function loadConfig() {
    const res  = await fetch(`/api/config`, { next: { revalidate: 60*10 } });
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
