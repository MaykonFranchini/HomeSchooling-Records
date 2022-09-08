import { Box, Flex, Text } from "@chakra-ui/react";
import { format, formatDistance, subDays } from 'date-fns'
import { Calendar } from "phosphor-react";
import { Avatar } from "./Avatar";

interface ActivityCardProps {
  title: string;
  date: Date;
  content: string;
  child: {
    name: string;
    src: string;
  }

}

export function ActivityCard({title, date, child, content}: ActivityCardProps) {
  const formattedDate = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  
  return (
    <Box bg='gray.50' p={2} mt={5} pb={4} borderRadius='12px' boxShadow=' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
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

      <Box mt={5}>
        <Avatar name={child.name} />
      </Box>
    </Box>
  )
}