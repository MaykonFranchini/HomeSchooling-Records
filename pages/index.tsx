import { Sidebar } from '../components/Sidebar'
import {  Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'


export default function Home()  {
  return (
    <>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />
      <Box p={5} bg='blue.100'>
        <Header />
        
      </Box>
    </>
  )
}