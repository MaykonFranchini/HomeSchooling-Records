import { Box, Avatar as ChakraAvatar, Text } from "@chakra-ui/react";

interface AvatarProps {
  name: string;
  src?: string;
}

export function Avatar({name, src}: AvatarProps) {
  return (
    <Box display='flex' alignItems='center' gap={1} >
      <ChakraAvatar size='sm' name={name} src={src} />
      <Text fontSize='sm' fontWeight='semibold'>{name}</Text>
    </Box>
  )
}