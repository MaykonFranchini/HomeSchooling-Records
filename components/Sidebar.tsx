import { VStack, Box, Text } from '@chakra-ui/react'
import { GearSix, UserList, HouseLine, SignOut } from 'phosphor-react'
import { signOut } from 'next-auth/react'
import { NavLink } from './NavLink'


export function Sidebar() {
  return (
    <Box position='absolute' height='98vh' bg='blue.600' color='gray.100' fontSize={15} fontWeight='bold' textAlign='center' w='240px'>
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