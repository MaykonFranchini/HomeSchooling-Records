import { Box,Text } from "@chakra-ui/react";
import { formatDistance, subDays } from "date-fns";

interface NotificationMessageProps {
  content: string;
  date: Date;
}

export function NotificationMessage({content, date}: NotificationMessageProps) {
  const formattedDate = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  return (
    <Box borderBottom='1px solid #EDF2F7' p={3}>
      <Text fontWeight='semibold'>{content}</Text>
      <Text fontSize='sm' color='gray.500'>{formattedDate}</Text>
    </Box>
  )
}