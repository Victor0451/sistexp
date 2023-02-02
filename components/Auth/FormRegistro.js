import React from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    AlertDescription,

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

        <Box
            p={4}
            mt={5}
            border='1px' borderColor='black' borderRadius="xl"
            mb={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Usuarios</Heading>
                <Text fontSize={'xl'}>
                    Registro de usuarios del sistema.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" p={4} backgroundColor="whiteAlpha.300">

                <Box mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" >
                    <Box className='row' p={4} alignItems="center" justifyContent="space-between">

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

                        {errores ? (
                            <Alert className='mt-4' status='error' ariant='left-accent'>
                                <AlertIcon />
                                <AlertDescription>{errores}.</AlertDescription>
                            </Alert>
                        ) : null}

                    </Box>

                    <Box className='row' p="4" justifyContent="end" mt="6">

                        <Button colorScheme='blue' size="sm" onClick={() => registrarUsuario()}>Registrar Usuario</Button>

                        <Link href='/'>
                            <Button colorScheme='red' size="sm" ml='1'>
                                Cancelar
                            </Button>
                        </Link>
                    </Box>

                </Box>

            </Container>
        </Box>











    )
}

export default FormRegistro