import { Box, Link, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router';

interface NavLinkProps extends ChakraLinkProps {
  icon: React.ElementType;
  children: string;
  href: string;
}

export function NavLink({href, icon, children, ...rest}: NavLinkProps) {
  let active = false
  const { asPath } = useRouter()

  if(asPath === href) {
    active = true
  }

  return (
    <Box h='40px' mt={8}  display='flex' borderRadius='8px' alignItems='center' bg={active? 'blue.900' : ''} gap={2} p={5} >
      <NextLink href={href} passHref>
        <Link display='flex' alignItems='center' gap={3} {...rest}>
          <Icon as={icon} fontSize='20' weight="bold" />
          {children}
        </Link>
      </NextLink>
    </Box>
  )
}