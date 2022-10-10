import { Box, Button, Link } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import NextLink from 'next/link'
import { ArrowCircleRight } from "phosphor-react";

export function SignInButton() {
  const {data: session} = useSession()

  if(session) {
    return (
      <Box>
        <NextLink href='/dashboard' passHref>
          <Link display='flex'alignItems='center' bgGradient='linear(to-l, #7928CA, #FF0080)' color='white' p='5px 10px' borderRadius='8px' fontWeight='bold' >
              Go to dashboard
          </Link>
        </NextLink>
      </Box>
    )
  }
  return (
    <Button
      size='sm'
      colorScheme='gray'
      onClick={() => signIn(undefined, { callbackUrl: '/dashboard ' })}
    >
      Sign in
    </Button>
  )
}
