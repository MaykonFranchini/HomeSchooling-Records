import { Box, Avatar as ChakraAvatar, Text } from "@chakra-ui/react";

interface AvatarProps {
  name: string;
  src?: string;
}

export function Avatar({name, src}: AvatarProps) {
  return (
    <Box display='flex' alignItems='center' gap={3}>
      <ChakraAvatar size='sm' name={name} src={src} />
      <Text fontSize='sm'>{name}</Text>
    </Box>
  )
}