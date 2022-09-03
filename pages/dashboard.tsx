import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div>

      <Head>
        <title>Dashboard | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />

      <Box w='100%' ml='240px' p={5}>
        <Text fontSize='2xl'>Dashboard</Text>
      </Box>
    </div>
  )
}