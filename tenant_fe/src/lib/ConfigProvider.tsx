'use client'

import React, { createContext, useContext } from 'react';
import  type { Config } from '@mystiker123/config-schema';

const ConfigCtx = createContext<Config | null>(null);

export function useConfig(): Config {
    const ctx = useContext(ConfigCtx);
    if (!ctx) throw new Error('useConfig must be inside <ConfigProvider />');
    return ctx;
}

export default function ConfigProvider(
    { cfg, children }: { cfg: Config; children: React.ReactNode },
) {
    return <ConfigCtx.Provider value={cfg}>{children}</ConfigCtx.Provider>
}