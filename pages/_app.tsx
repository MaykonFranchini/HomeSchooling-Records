import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/global.css'
import { ChakraProvider } from "@chakra-ui/react"

export default function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}
