import { Box, Text, Flex, Tooltip, Link, Icon } from "@chakra-ui/react";
import { YoutubeLogo, BookBookmark, MusicNotes } from "phosphor-react";

interface ResourceCardProps {
  subject: string;
  description: string;
  type: 'video' | 'article' | 'music';
  src: string;

}

export function ResourceCard({type, subject, description, src}:ResourceCardProps) {
  const resourceType = {
    video: YoutubeLogo,
    article: BookBookmark,
    music: MusicNotes,
  }

  const icon = resourceType[type];
  
  return (
    <Box 
      bg='gray.50' 
      p={2} mt={5} 
      pb={4} 
      borderRadius='12px' 
      boxShadow=' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'
      _hover={{background: 'gray.100'}}
    >
      <Flex gap={2} alignItems='center'>
        <Tooltip label={type.toUpperCase()} color='whiteAlpha.900'>
          <Icon as={icon} fontSize={40} weight="duotone"/>
        </Tooltip>
      <Box>
        <Text fontSize={14} fontWeight='semibold'>{subject.toUpperCase()}</Text>
        <Link fontSize={14} href={src} isExternal color='blue.400' fontWeight='semibold'>{description}</Link>
      </Box>
      
      </Flex>
    </Box>
  )
}