import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

import Head from 'next/head'
import { Bookmarks, Books, NotePencil, Student } from 'phosphor-react'
import { SignInButton } from '../components/SignInButton'



export default function Home()  {

    const basicBoxStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSize: '500px',
      fontWeight: 'bold',
      fontSize: '16px',
      px: 4,
      background:
        'url(https://picsum.photos/id/20/500) center/cover no-repeat',
    }


  return (
    <>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Box>

        <Flex mt='16px' w='100%' p=' 10px 20px' justifyContent='space-between'>
          <Flex gap={2}>
            <Books size={32} weight="light" />
            <Text
              fontWeight='bold'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='xl'
            >
              HomeSchollingTrack
            </Text>
          </Flex>
          <Box>
            <SignInButton/>
          </Box>
        </Flex>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }} maxW='1200px' margin='auto'>
          <GridItem mt='40px'>
            <Text
              fontWeight='bold'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='3xl'
              maxW='400px'
            >
              The best way to keep track of your home scholling journey
            </Text>
            <Text
            mt='20px'
              fontSize='lg'
              maxW='400px'
              color='gray.400'
              >
              Keep track of your pupils progress saving all lessons at one place. Share with Home Scholling authorites. Less papper and more productivity.
            </Text>
          </GridItem >

          <GridItem position='relative' sx={basicBoxStyles} >
            <Box bg='white' w='240px' p='16px' borderRadius='8px' display='flex' alignItems='center' gap={2} color='blackAlpha.700' boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' position='absolute' left='20px' top='10%'>
              <Box p='4px' color='white' borderRadius='8px' bgGradient='linear(to-l, #7928CA, #FF0080)'>
                <Student size={24} weight="bold" />
              </Box>
              <Text>Add your students</Text>
            </Box>
            <Box bg='white' w='240px' p='16px' borderRadius='8px' display='flex' alignItems='center' gap={2} color='blackAlpha.700' boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' position='absolute' right='10px' top='50%'>
              <Box p='4px' color='white' borderRadius='8px' bgGradient='linear(to-l, #FF0080, #7928CA)'>
                <Bookmarks size={24} weight="bold" />
              </Box>
              <Text>Save your lessons</Text>
            </Box>
            <Box bg='white' w='240px' p='16px' borderRadius='8px' display='flex' alignItems='center' gap={2} color='blackAlpha.700' boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' position='absolute' left='10px' bottom='10%'>
              <Box p='4px' color='white' borderRadius='8px' bgGradient='linear(to-l, #7928CA, #FF0080)'>
                <NotePencil size={24} weight="bold" />
              </Box>
              <Text>Add your resources</Text>
            </Box>
          </GridItem >

        </Grid>



      </Box>
    </>
  )
}
