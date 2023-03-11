import '@styles/globals.css'

import type { AppProps } from 'next/app'

import { useState } from 'react'

import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { Roboto_Mono } from 'next/font/google'
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <style jsx global>{`
                html,
                body {
                    font-family: ${robotoMono.style.fontFamily};
                }
            `}</style>

            <Component {...pageProps} />
        </SessionContextProvider>
    )
}
