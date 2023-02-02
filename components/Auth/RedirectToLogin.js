import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Box,
  Image

} from '@chakra-ui/react'
import Link from "next/link";

const RedirectToLogin = () => {
  return (
    <Box
      mt={5}
      p={4}
    >

      <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" p={4} backgroundColor="whiteAlpha.300">




        <Alert
          mt="10"
          mb="10"
          status='info'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='600px'
          border='1px'
          borderColor='black'
          borderRadius="xl"

        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            ATENCION!
          </AlertTitle>

          <AlertDescription textAlign="justify">
            Para poder ingresar al sistema, tienes que iniciar session o registrarte. Para loguearte, <Link href={"/"}>¡HAZ CLICK ACA!</Link>.
          </AlertDescription>

          <Image
            mt={4}
            src='/img/error_401.webp'
            alt='401'
          />

        </Alert>
      </Container>


    </Box>

  );
};

export default RedirectToLogin;
