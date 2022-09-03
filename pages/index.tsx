import { LoginButton } from '../components/Login-btn'
import { Sidebar } from '../components/Sidebar'
import { Text, Box } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home()  {
  return (
    <div>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />
      <Box w='100%' ml='240px' p={5}>
        <Text fontSize='2xl'>Welcome home</Text>
      </Box>
    </div>
  )
}