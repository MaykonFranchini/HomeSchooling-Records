import { Sidebar } from '../components/Sidebar'
import {  Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'
export default function Home()  {
  return (
    <div>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />
      <Box ml='240px' p={5}>
        <Header />
      </Box>
    </div>
  )
}