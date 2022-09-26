import { VStack, Box, Text, useBreakpointValue, Button, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, DrawerOverlay, Input, DrawerFooter, useDisclosure } from '@chakra-ui/react'
import { GearSix, UserList, HouseLine, SignOut, List } from 'phosphor-react'
import { signOut } from 'next-auth/react'
import { NavLink } from './NavLink'



export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  },
  {
    fallback: 'md',
  }
  )

  if(isWideVersion) {
    return (
      <Box as='aside' position='fixed' zIndex={1} overflowX='hidden' top='0' left='0' height='100vh' bg='blue.900' color='gray.100' fontSize={15} fontWeight='bold' textAlign='center' w='240px'>
        <Text mt={8} fontSize='xl'>HomeSchoolingTrack</Text>

        <VStack
          spacing={1}
          align='stretch'
          overflow='hidden'
          padding={3}
          >

          <NavLink href='/dashboard' icon={HouseLine} >Dashboard</NavLink>

          <NavLink href='/students' icon={UserList} >Students</NavLink>

          <NavLink href='/settings' icon={GearSix} >Settings</NavLink>

          <Box cursor='pointer' onClick={() => signOut()} h='40px' position='absolute' p={5} bottom={16} display='flex' alignItems='center' gap={3}>
            <SignOut size={24} weight="bold" />
            Log out
          </Box>

        </VStack>
      </Box>
    )
  }

  return (
    <>
      <Button onClick={onOpen} background='transparent' _hover={{background: 'transparent'}}>
        <List size={24} color="#616465" weight="bold" />
      </Button>
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}

    >
      <DrawerOverlay />
      <DrawerContent bg='blue.900' fontSize={15} fontWeight='bold' maxWidth='250px'>
        <DrawerCloseButton color='whiteAlpha.900'/>
        <DrawerHeader color='whiteAlpha.900' mt={5}>HomeSchoolingTrack</DrawerHeader>

        <DrawerBody>
          <VStack
            spacing={1}
            align='stretch'
            overflow='hidden'
            padding={3}
            >

            <NavLink href='/dashboard' icon={HouseLine} >Dashboard</NavLink>

            <NavLink href='/students' icon={UserList} >Students</NavLink>

            <NavLink href='/settings' icon={GearSix} >Settings</NavLink>

            <Box cursor='pointer' color='whiteAlpha.900' onClick={() => signOut()} h='40px' position='absolute' p={5} bottom={16} display='flex' alignItems='center' gap={3}>
              <SignOut size={24} weight="bold" />
              Log out
            </Box>

          </VStack>
        </DrawerBody>


      </DrawerContent>
    </Drawer>
    </>
  )

}
