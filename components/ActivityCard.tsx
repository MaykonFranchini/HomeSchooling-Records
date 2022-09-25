import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { format, formatDistance, subDays } from 'date-fns'
import { Calendar } from "phosphor-react";
import { Avatar } from "./Avatar";

interface ActivityCardProps {
  title: string;
  date: string;
  content: string;
  file_url: string;
  child?: {
    name: string;
    src: string;
  }

}

export function ActivityCard({title, date, child, content, file_url}: ActivityCardProps) {
  const formattedDate = formatDistance(new Date(date), new Date(), { addSuffix: true })

  return (
    <Box bg='gray.50' p={2} mt={5} pb={4} borderRadius='12px' minW='260px' boxShadow=' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
      <Flex justify='space-between' mt={2} >
        <Text fontWeight='semibold'>{title}</Text>

        <Flex color='gray.500'>
          <Calendar size={22} />
          <Text >{formattedDate}</Text>
        </Flex>
      </Flex>

      <Box mt={2}>
        <Text fontSize='sm'>{content}</Text>
      </Box>

      {child && (
        <Box mt={5}>
          <Avatar name={child.name} />
        </Box>
      )}

      {file_url &&
      <Box mt={2} >
        <Image src={file_url} alt={content} borderRadius='6px' />
      </Box>}
    </Box>
  )
}
