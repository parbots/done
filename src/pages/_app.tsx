import '@styles/globals.css'

import type { AppProps } from 'next/app'

import { Roboto_Mono } from 'next/font/google'
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html,
                body {
                    font-family: ${robotoMono.style.fontFamily};
                }
            `}</style>

            <Component {...pageProps} />
        </>
    )
}
