import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { StudentCard } from "../components/StudentCard";
import { ActivityCard } from '../components/ActivityCard';

export default function Dashboard() {
  return (
    <>

      <Head>
        <title>Dashboard | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />

      <Box ml='240px' p={5} >
        <Header />
        <Flex flexDirection='column'>
          <Box>
            <Text fontWeight='bold'>My Students <Link href='/students' fontSize={11} marginLeft={1} color='blue.500'>View all</Link></Text>
            <Flex gap={3} marginTop={2}>
              <StudentCard  name='Lucas Franchini' schoolYear='Year 6'/>
              <StudentCard  name='Gabriel Franchini' schoolYear='Year 1'/>
              <StudentCard  name='Maykon Franchini' src='https://github.com/maykonfranchini.png' schoolYear='Year 12'/>
            </Flex>
          </Box>

          <Box p={2} bg='whiteAlpha.900' maxW='300px' mt={5} borderRadius='12px'>
            <Text fontWeight='bold'>Recent Activites</Text>
            <ActivityCard title='Math' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Lucas Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
            <ActivityCard title='Science' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Gabriel Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
            <ActivityCard title='History' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Gabriel Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
          </Box>
        </Flex>
      </Box>
    </>
  )
}