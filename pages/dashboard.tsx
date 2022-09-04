import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { StudentCard } from "../components/StudentCard";

export default function Dashboard() {
  return (
    <div>

      <Head>
        <title>Dashboard | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />

      <Box ml='240px' p={5} >
        <Header />
        <Flex>
          <Box>
            <Text fontWeight='bold'>My Students <Link href='/students' fontSize={11} marginLeft={1} color='blue.500'>View all</Link></Text>
            <Flex gap={3} marginTop={2}>
              <StudentCard  name='Lucas Franchini' schoolYear='Year 6'/>
              <StudentCard  name='Gabriel Franchini' schoolYear='Year 1'/>
              <StudentCard  name='Maykon Franchini' src='https://github.com/maykonfranchini.png' schoolYear='Year 12'/>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  )
}