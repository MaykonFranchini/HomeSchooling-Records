import { format } from "date-fns";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { StudentProps } from "./index"
import { prisma } from '../../services/prisma';
import { Wrap, Flex, FormControl, FormLabel, Input, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Button, Textarea, Avatar as ChakraAvatar, Box, WrapItem, Grid, GridItem } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { ActivityCard } from "../../components/ActivityCard";
import { useState } from "react";
import { uploadFile } from "../../utils/uploadFile";

interface CreateLessonProps {
  subject: string;
  content: string;
  file: File;
}

export interface LessonProps {
  id: number;
  subject: string;
  content: string;
  studentId: number;
  createdAt: string;
}

export default function Student(student: StudentProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateLessonProps>();
  const [lessons, setLessons] = useState<LessonProps[]>(student.lessons ?? []);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = async (data: CreateLessonProps) => {

    const image_url = await uploadFile(data.file[0],'file')

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        body: JSON.stringify({...data, studentId: student.id, image_url}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLessons([...lessons, responseData])
      onClose()
      toast.success('Lesson added successfully')
      reset()
    } catch (err: any) {
      toast.error('Something went wrong. Try again later.')
      onClose()
      reset()
    }
  }

  return (
    <>
      <Head>
      <title>My Lessons | HomeSchoolingTrack</title>
      </Head>
      <ToastContainer />

      <Sidebar />
      <Flex gap={5}>

        <Flex flex="1" flexDirection='column' marginTop={2} marginLeft={{ base: '24px', md: '250px' }} >
          <Header />
          <Box>
            <ChakraAvatar size="xl" name={student.fullName} src={student.avatarUrl}  mb={5}/>
            <Flex gap={5}>
              <Text fontSize='2xl'>{student.fullName.split(' ')[0]}&apos;s learning journey</Text>
              <Button bg='blue.100' onClick={onOpen}>Add a lesson</Button>
            </Flex>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a lesson</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input type='text' {...register("subject", { required: true})} />
                  {errors.subject?.type === 'required' && <Text color='red.100'>Subject is required</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <Textarea placeholder='Add your lesson description' {...register("content", { required: true})}/>
                  {errors.content?.type === 'required' && <Text color='red.100'>Content is required</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Upload a file</FormLabel>
                    <Input type='file' {...register("file")} />
                </FormControl>
                <Input variant='filled' color='whiteAlpha.900' _hover={{background: 'blue.600'}} bg='blue.700' cursor='pointer' disabled={errors.subject || errors.content ? true : undefined} fontWeight='bold' marginY={5} type="submit" />
              </form>
              </ModalBody>
            </ModalContent>
          </Modal>


          <Grid templateColumns='1fr' gap={2}>
            {lessons.length > 0 ? lessons.map(lesson => (<GridItem   key={lesson.id}><ActivityCard size={{sm: 400, lg:400}} title={lesson.subject} content={lesson.content} date={lesson.createdAt} file_url={lesson.file_url} /></GridItem> )) : <Text>No lessons yet</Text> }
          </Grid>
        </Flex>
      </Flex>
    </>
  )
}


export const  getServerSideProps :GetServerSideProps = async ({req, params}) => {
  const session = await getSession({req})
  const id = params!.id

    const student = await prisma.student.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        lessons: true
      }
    })

    if(session?.userId !== student?.userId) {
      return {
        notFound: true
      }
    }
    const formatedDOB = format(new Date(student!.dateOfBirth), 'dd/MM/yyyy')
    const formatedLessons = student?.lessons.map(lesson => {
      return {
        ...lesson,
        createdAt: lesson.createdAt.toString()
      }
    })

  // Pass data to the page via props
  return { props: {
    id:student!.id,
    fullName: student!.fullName,
    schoolYear: student!.schoolYear,
    avatarUrl: student!.avatarUrl,
    dateOfBirth: formatedDOB,
    lessons: formatedLessons
  } }
}
