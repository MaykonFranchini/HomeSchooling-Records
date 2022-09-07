import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface StudentCardProps {
  name: string;
  src?: string;
  schoolYear: string;
}

export function StudentCard({src, name, schoolYear}: StudentCardProps) {
  const nameFormated = (name : string) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName} ${lastName[0]}.`
  }
  return (
    <Flex gap={3} bg='whiteAlpha.900' p={3} borderRadius='12px' w={{base: '90px', xs: '200px', md: '240px'}} boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px;'>
      <Avatar size={{base: 'sm', md: 'md'}} display={{base: 'none', sm: 'block' }} src={src} name={name}/>
      <Box>
        <Text fontWeight='bold' fontSize={{base: '12', md: '14'}}>{nameFormated(name)}</Text>
        <Text fontSize={14}  color='gray.500'>{schoolYear}</Text>
      </Box>
    </Flex>
  )
}