import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { Books } from 'phosphor-react'
import { SignInButton } from '../components/SignInButton'


export default function Home()  {
  return (
    <>
      <Head>
      <title>Home | HomeSchoolingTrack</title>
      </Head>

      <Flex gap={2}>
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

      </Flex>
    </>
  )
}
