import { Flex, Box, Modal, ModalOverlay, ModalContent,ModalHeader,
ModalBody,ModalCloseButton, useDisclosure, Button, Link } from '@chakra-ui/react'

import { signIn, useSession } from 'next-auth/react';
import { Bell } from 'phosphor-react'
import React from 'react';
import { Avatar } from './Avatar';
import { NotificationMessage } from './NotificationMessage';

export function Header() {
  const { data: session} = useSession()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex justify='space-between' justifyContent='flex-end' paddingX={5} w='100%'>
      <Box display='flex' alignItems='center'  gap={3}>
        {session ? <Avatar name={session.user?.name || 'John Doe'} src={session.user?.image || 'asas'} /> : <button onClick={() => signIn(undefined, { callbackUrl: '/dashboard ' })}>Sign in</button>}
      </Box>
    </Flex>
  );
}
