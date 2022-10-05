import { Sidebar } from '../components/Sidebar'
import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'


export default function Home()  {
  return (
    <>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Flex gap={2}>
        <Sidebar />
        <Flex flex="1" flexDirection='column' marginTop={2} marginLeft={{ base: '24px', md: '250px' }}>
          <Header />
        </Flex>
      </Flex>
    </>
  )
}
