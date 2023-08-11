
import '@/styles/reset.css'
import '@/styles/globals.css'

import { Roboto_Mono } from 'next/font/google'
import type { AppProps } from 'next/app'

import { useState } from 'react'

import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {

    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <style jsx global>
                {`
                    html,
                    body {
                        font-family: ${robotoMono.style.fontFamily};
                    }
                `}
            </style>

            <Component {...pageProps} />
        </SessionContextProvider>
    );
};
