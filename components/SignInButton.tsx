import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <Button size='sm' colorScheme='gray' onClick={() => signIn(undefined, { callbackUrl: '/dashboard ' })}>
      Sign in
    </Button>
  )
}
