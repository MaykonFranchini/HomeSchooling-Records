import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { StudentCard } from "../components/StudentCard";
import { ActivityCard } from '../components/ActivityCard';
import { ResourceCard } from "../components/ResourceCard";
import { ArrowRight } from "phosphor-react";

export default function Dashboard() {
  return (
    <>

      <Head>
        <title>Dashboard | HomeSchoolingTrack</title>
      </Head>

      <Sidebar />

      <Box ml='240px' p={5} >
        <Header />
        <Flex flexDirection='column' maxW='600px'>
          <Box>
            <Text fontWeight='bold'>My Students <Link href='/students' fontSize={11} marginLeft={1} color='blue.500' _hover={{color: 'blue.700'}}>View all</Link></Text>
            <Flex gap={3} marginTop={2}>
              <StudentCard  name='Lucas Franchini' schoolYear='Year 6'/>
              <StudentCard  name='Gabriel Franchini' schoolYear='Year 1'/>
              <StudentCard  name='Maykon Franchini' src='https://github.com/maykonfranchini.png' schoolYear='Year 12'/>
            </Flex>
          </Box>

          <Flex gap={4}>
            <Box p={3} bg='whiteAlpha.900' maxW='300px' mt={5} borderRadius='12px' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
              <Text fontWeight='bold'>Recent Activites</Text>
              <ActivityCard title='Math' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Lucas Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
              <ActivityCard title='Science' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Gabriel Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
              <ActivityCard title='History' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Gabriel Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
            </Box>
            <Box p={3} bg='whiteAlpha.900' maxW='300px' mt={5} borderRadius='12px' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
              <Flex fontWeight='bold' justify='space-between' alignItems='center'>
                My Resources 
                <Flex gap={1} >
                  <Link fontSize={11} color='blue.500' _hover={{color: 'blue.700'}}>View all</Link>
                  <ArrowRight size={14} weight="bold" color='#3182CE' />
                </Flex>
              </Flex>
              <ResourceCard type='video' src='https://youtube.com' description='Website to practice grammar' subject='English'/>
              <ResourceCard type='article' src='https://medium.com' description='Fractions article' subject='Math'/>
              <ResourceCard type='article' src='https://scratch.mit.edu/' description='Website to learn to code' subject='IT'/>
            </Box>
          </Flex>

        </Flex>
      </Box>
    </>
  )
}