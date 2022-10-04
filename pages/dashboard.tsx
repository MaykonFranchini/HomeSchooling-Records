import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { StudentCard } from "../components/StudentCard";
import { ActivityCard } from '../components/ActivityCard';
import { ResourceCard } from "../components/ResourceCard";
import { ArrowRight } from "phosphor-react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { StudentProps } from "./students";
import { LessonProps} from './students/[id]'

interface DashboardProps {
  students: StudentProps[],
  recentActivities: LessonProps[]
}

export default function Dashboard({students, recentActivities}: DashboardProps) {

  console.log(students)
  return (
    <>
      <Head>
        <title>Dashboard | HomeSchoolingTrack</title>
      </Head>

      <Flex gap={2}  >
      <Sidebar />
        <Flex flex="1" flexDirection='column' marginTop={2} marginLeft={{ base: '24px', md: '250px' }}>
          <Header />

          <Box>
            <Text fontWeight='bold'>My Students <Link href='/students' fontSize={11} marginLeft={1} color='blue.500' _hover={{color: 'blue.700'}}>View all</Link></Text>
            <Flex gap={3} marginTop={2}>
              {students ?
                students.map(student => (
                  <Link marginY={3} key={student.id} href={`students/${student.id}`}>
                    <StudentCard key={student.id} name={student.fullName} schoolYear={student.schoolYear} src={student.avatarUrl} />
                  </Link>
                ))
                :
                <Text>You don`t have any pupils.</Text>
              }

            </Flex>
          </Box>

          <Flex gap={4} flexDirection={{base: 'column', md: 'row'}}>
            <Box p={3} bg='whiteAlpha.900' maxW='300px' mt={5} borderRadius='12px' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
              <Text fontWeight='bold'>Recent Activites</Text>
              {recentActivities ? recentActivities.map(activity => (
                <ActivityCard key={activity.id} file_url={activity.file_url} title={activity.subject} date={activity.createdAt} content={activity.content} child={{ name: activity.student.fullName, src: activity.student.avatarUrl }} />
              )) : <Text>No files</Text>}
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
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      notFound: true
    }
  }

  const response = await fetch('http://localhost:3000/api/users/profile?userId=' + session.userId)
  const data = await response.json()

console.log(data);


  // Pass data to the page via props
  return {
    props: {
      students: data.students,
      recentActivities: data.recentActivities
    }
  }
}
