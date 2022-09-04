import { Box, Text } from "@chakra-ui/react";
import Head from 'next/head'
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function Students() {
  return (
    <Box>
      <Head>
      <title>My Students | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />
      <Box ml='240px' p={5}>
        <Header />
        
        <Text fontSize='2xl'>Students</Text>
      </Box>
    </Box>
  )
}