
import { Box, Button, Flex, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StudentCard } from "../components/StudentCard";

import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";

interface ChildProps { 
  id: number;
  fullName: string;
  schoolYear: string;
  dateOfBirth: Date;
  avatarUrl?: string;
  userId: string;
}


interface CreateChildProps { 
  fullName: string;
  schoolYear?: string;
  dateOfBirth: Date;
  parentId: number;
}

export default function Students() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateChildProps>();
  const {data: session} = useSession()
  const [children, setChildren] = useState<ChildProps[]>([])

  useEffect(()=> {
    async function fetchChildren() {
      const res = await fetch('/api/children?parentId=' + session?.userId)
      const data = await res.json()
      setChildren(data)
    }
    fetchChildren()
  }, [session?.userId])

  const onSubmit = async(data: CreateChildProps) => {
    
    try { 
      const response = await fetch('/api/children', {
        method: 'POST',
        body: JSON.stringify({...data, parentId: session?.userId}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      
      if(response.status === 201) {
        onClose()
        toast.success('Student added successfully')
        setChildren([...children, responseData])
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
        <Flex flex="1" flexDirection='column' marginTop={2}>
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
                  <Input variant='filled' color='whiteAlpha.900' _hover={{background: 'blue.600'}} bg='blue.700' cursor='pointer' disabled={errors.fullName || errors.dateOfBirth ? true : undefined} fontWeight='bold' marginY={5} type="submit" />
              </form>
              </ModalBody>
            </ModalContent>
          </Modal>


          <Flex gap={3}>

              {children.map(child => (
                  
                <Link marginY={3} key={child.id} href={`student/${child.id}`}>
                  <StudentCard key={child.id} name={child.fullName} schoolYear={child.schoolYear} />
                </Link>
              ))}

          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
