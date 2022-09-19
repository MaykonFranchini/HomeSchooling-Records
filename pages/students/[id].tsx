import { format } from "date-fns";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { StudentProps } from "./index"
import { prisma } from '../../services/prisma';
import { Flex, FormControl, FormLabel, Input, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { ActivityCard } from "../../components/ActivityCard";


export default function Student(student: StudentProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = () => {
    console.log('submit')
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
                  <FormLabel>Full name</FormLabel>
                  <Input type='text' {...register("fullName", { required: true})} />
                  {errors.fullName?.type === 'required' && <Text color='red.100'>Full name is required</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type='date' {...register("dateOfBirth", { required: true})}/>
                  {errors.dateOfBirth?.type === 'required' && <Text color='red.100'>Date of Birth is required</Text>}                     
                </FormControl>
                <FormControl>
                  <FormLabel>School Year</FormLabel>             
                </FormControl>
                  <Input variant='filled' color='whiteAlpha.900' _hover={{background: 'blue.600'}} bg='blue.700' cursor='pointer' disabled={errors.fullName || errors.dateOfBirth ? true : undefined} fontWeight='bold' marginY={5} type="submit" />
              </form>
              </ModalBody>
            </ModalContent>
          </Modal>


          <Flex gap={3}>
          <ActivityCard title='Math' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Lucas Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
          <ActivityCard title='Math' date={new Date()} content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.' child={{name: 'Lucas Franchini', src: 'https://github.com/maykonfranchini.png'}}/>
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
      }
    })
    
    if(session?.userId !== student?.userId) {
      return {
        notFound: true
      }
    }
    const formatedDOB = format(new Date(student!.dateOfBirth), 'dd/MM/yyyy')
  
  // Pass data to the page via props
  return { props: {
    fullName: student!.fullName,
    schoolYear: student!.schoolYear,
    avatarUrl: student!.avatarUrl,
    dateOfBirth: formatedDOB,
  } }
}