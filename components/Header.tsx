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
        <Box p={1} borderRadius='50%' bg='whiteAlpha.900'>
          <Button onClick={onOpen} p='0' bg ='transparent' _hover={{background: 'transparent'}}><Bell size={24} color="#616465" weight="bold" /></Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Notifications</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NotificationMessage content='Lucas uploaded new job' date={new Date()} />
                <NotificationMessage content='Gabriel completed new task' date={new Date()} />

                <Link m={2}  href='/notifications' color='blue.400' fontWeight='semibold'>View all notifications</Link>
              </ModalBody>
            </ModalContent>
          </Modal>
          </Box>
        {session ? <Avatar name={session.user?.name || 'John Doe'} src={session.user?.image || 'asas'} /> : <button onClick={() => signIn(undefined, { callbackUrl: '/dashboard ' })}>Sign in</button>}
      </Box>
    </Flex>
  );
}
