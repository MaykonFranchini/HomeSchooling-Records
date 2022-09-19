import { format } from "date-fns";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { StudentProps } from "./index"
import { prisma } from '../../services/prisma';
import { Flex, FormControl, FormLabel, Input, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Button, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { ActivityCard } from "../../components/ActivityCard";
import { useState } from "react";

interface CreateLessonProps { 
  subject: string;
  content: string;
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
    
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        body: JSON.stringify({...data, studentId: student.id}),
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
          
      <Flex gap={5}>
        
        
      <Sidebar />
        <Flex flex="1" flexDirection='column' marginTop={2}>
          <Header />
          <Flex gap={5}>
            <Text fontSize='2xl'>{student.fullName.split(' ')[0]}'s learning journey</Text>
            <Button bg='blue.100' onClick={onOpen}>Add a lesson</Button>
          </Flex>

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
                  <Input variant='filled' color='whiteAlpha.900' _hover={{background: 'blue.600'}} bg='blue.700' cursor='pointer' disabled={errors.subject || errors.content ? true : undefined} fontWeight='bold' marginY={5} type="submit" />
              </form>
              </ModalBody>
            </ModalContent>
          </Modal>


          <Flex gap={3}>
            { lessons.length > 0 ? lessons.map(lesson => ( <ActivityCard key={lesson.id} title={lesson.subject} content={lesson.content} date={lesson.createdAt} /> )) : <Text>No lessons yet</Text> }
          </Flex>
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