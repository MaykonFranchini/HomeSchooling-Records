import { Button, Flex, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { StudentCard } from "../../components/StudentCard";

import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { LessonProps } from "./[id]";
import { uploadFile } from "../../utils/uploadFile";


export interface StudentProps {
  id: number;
  fullName: string;
  schoolYear: string;
  dateOfBirth: Date | String;
  avatarUrl?: string;
  userId: string;
  lessons?: LessonProps[]
}


interface CreateStudentProps {
  fullName: string;
  schoolYear?: string;
  dateOfBirth: Date;
  parentId: number;
  avatar: FileList;
}

export default function Students() {
  const { register, handleSubmit, formState, formState: { errors, isSubmitting }, reset } = useForm<CreateStudentProps>();
  const {data: session} = useSession()
  const [students, setStudents] = useState<StudentProps[]>([])

  useEffect(()=> {
    async function fetchChildren() {
      if(session?.userId) {
        const res = await fetch('/api/students?parentId=' + session?.userId)
        const data = await res.json()
        setStudents(data)
      }
    }
    fetchChildren()
  }, [session?.userId])

  const onSubmit = async(data: CreateStudentProps) => {

    const avatar_url = data.avatar.length !== 0 ? await uploadFile(data.avatar[0], 'avatar') : ''

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify({...data, parentId: session?.userId, avatar_url }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()

      if(response.status === 201) {
        onClose()
        toast.success('Student added successfully')
        setStudents([...students, responseData])
      } else {
        onClose()
        toast.error(`Error adding student: ${responseData.message}.`)
      }
      reset()
    }
    catch(err: any) {
      console.log(err)
      toast.error(err.message)
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  const schoolYears = ['Nursery', 'Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9','Year 10', 'Year 11']

  return (
    <>
      <Head>
      <title>My Students | HomeSchoolingTrack</title>
      </Head>
      <ToastContainer />

      <Flex gap={5}>


      <Sidebar />
        <Flex flex="1" flexDirection='column' marginTop={2} marginLeft={{ base: '24px', md: '250px' }}>
          <Header />
          <Flex gap={5}>
            <Text fontSize='2xl'>My students</Text>
            <Button bg='blue.100' onClick={onOpen}>Add a student</Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a student</ModalHeader>
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
                  <Select placeholder='Select year' {...register("schoolYear")}>
                    {schoolYears.map(year => <option value={year} key={year}>{year}</option>)}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Profile photo</FormLabel>
                  <Input type='file' {...register("avatar")}/>
                </FormControl>
                  <Button w='100%' variant='filled' color='whiteAlpha.900' _hover={{ background: 'blue.600' }} bg={isSubmitting ? 'gray.300' : 'blue.700'} cursor={isSubmitting ? 'not-allowed' : 'pointer'} disabled={errors.fullName || errors.dateOfBirth ? true : undefined} fontWeight='bold' marginY={5} type="submit">{ isSubmitting ? 'Creating...' : 'Create a student'}</Button>
              </form>
              </ModalBody>
            </ModalContent>
          </Modal>


          <Flex gap={3}>

              {students.length > 0 ?
                students.map(student => (
                  <Link marginY={3} key={student.id} href={`students/${student.id}`}>
                    <StudentCard key={student.id} name={student.fullName} schoolYear={student.schoolYear} src={student.avatarUrl} />
                  </Link>
                ))
              :
                <Text>You don`t have any pupils.</Text>
              }
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
