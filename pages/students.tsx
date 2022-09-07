import { Box, Flex, Text } from "@chakra-ui/react";
import Head from 'next/head'
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function Students() {
  return (
    <>
      <Head>
      <title>My Students | HomeSchoolingTrack</title>
      </Head>

      <Flex gap={5}>
      <Sidebar />
        <Flex flex="1" flexDirection='column' marginTop={2}>
          <Header />
          <Text fontSize='2xl'>Students</Text>
        </Flex>
      </Flex>
    </>
  )
}