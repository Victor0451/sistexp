import React from 'react'
import {
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton

} from '@chakra-ui/react'

import Link from 'next/link'

const FormRegistro = ({
    usuarioRef,
    contrasenaRef,
    nombreRef,
    apellidoRef,
    registrarUsuario,
    errores
}) => {
    return (
        <Container
            className=' mt-4 p-4'
            maxW='container.md'
            borderWidth='1px'
            borderRadius='lg'
            borderColor="blackAlpha.900"
            shadow='xl'


        >

            <h2>
                <strong>
                    <u>
                        Registrar Usuario
                    </u>
                </strong>
            </h2>


            <Box
                className='row'
                maxW="container.xl"
                mt="4"
                p={4}
                alignItems='center'
                borderWidth='1px'
                borderRadius='lg'
                borderColor="blackAlpha.500"
                justifyContent="center"
                display="flex"
            >



                <FormControl isRequired w="xs" >
                    <FormLabel >Usuario</FormLabel>
                    <Input id='usuario' type='text' ref={usuarioRef} />
                </FormControl>

                <FormControl isRequired w="xs" ml="1" >
                    <FormLabel >Contraseña </FormLabel>
                    <Input id='contrasena' type='password' ref={contrasenaRef} />
                </FormControl>

                <FormControl isRequired w="xs" ml="1" mt="4">
                    <FormLabel >Apellido</FormLabel>
                    <Input id='apellido' type='text' ref={apellidoRef} />
                </FormControl>


                <FormControl isRequired w="xs" ml="1" mt="4">
                    <FormLabel >Nombre</FormLabel>
                    <Input id='nombre' type='text' ref={nombreRef} />
                </FormControl>

            </Box>

            {errores ? (
                <Alert className='mt-4' status='error' ariant='left-accent'>
                    <AlertIcon />
                    <AlertDescription>{errores}.</AlertDescription>
                </Alert>
            ) : null}


            <Box
                w='100%'
                mt="4"
                p={4}
                justifyContent="center"
                display="flex"
                maxW="container.xl"
            >
                <Stack spacing={4} direction='row' align='center'>
                    <Button colorScheme='blue' size="sm" onClick={() => registrarUsuario()}>Registrar Usuario</Button>

                    <Link href='/'>
                        <Button colorScheme='red' size="sm">
                            Cancelar
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Container>

    )
}

export default FormRegistro