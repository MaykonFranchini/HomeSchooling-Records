import { Flex, Box, Text } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react';
import {format} from 'date-fns'
import { Bell } from 'phosphor-react'
import React from 'react';
import { Avatar } from './Avatar';

export function Header() {
  const { data: session} = useSession()
  const formattedDate = format(new Date(), 'EEEE, d MMMM')

  return (
    <Flex justify='space-between'>
      <Text>{formattedDate}</Text>
      <Box display='flex' alignItems='center' gap={3}>
        <Box p={1} borderRadius='50%' bg='whiteAlpha.900'><Bell size={24} color="#616465" weight="light" /></Box>
        {session?  <Avatar name={session.user?.name || 'John Doe'} src={session.user?.image || 'asas'}/> : <button onClick={() => signIn()}>Sign in</button>}
      </Box>
    </Flex>
  );
}