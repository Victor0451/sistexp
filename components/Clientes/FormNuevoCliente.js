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

} from '@chakra-ui/react';

import Link from 'next/link';

const FormNuevoCliente = ({
    errores,
    flag,
    apellidoRef,
    nombreRef,
    dniRef,
    direccionRef,
    telefonoRef,
    nacimientoRef,
    mailRef,
    existeCliente,
    registrarCliente
}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Clientes</Heading>
                <Text fontSize={'xl'}>
                    Registro de Clientes en el sistema.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" p={4} backgroundColor="whiteAlpha.300">

                <Box border='1px' borderColor='black' borderRadius="xl" p="4">
                    <Box className='row' p={4} alignItems="center" justifyContent="space-between">
                        <FormControl isRequired w="xs"  >
                            <FormLabel >DNI - Ingresa el dni y verifica si esta en el sistema</FormLabel>
                            <Input type='number' ref={dniRef} />
                        </FormControl>

                        <FormControl isRequired w="xs" mt="10" onClick={existeCliente}>
                            <Button colorScheme={"blue"} >Buscar</Button>
                        </FormControl>

                    </Box>
                </Box>

                {flag === false ? null
                    : flag === true ? (

                        <>
                            <Box mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" >
                                <Box className='row' p={4} alignItems="center" justifyContent="space-between">
                                    <FormControl isRequired w="xs" mt="10"  >
                                        <FormLabel >Nombre</FormLabel>
                                        <Input type='text' ref={nombreRef} />
                                    </FormControl>

                                    <FormControl isRequired w="xs" mt="10" >
                                        <FormLabel >Apellido</FormLabel>
                                        <Input type='text' ref={apellidoRef} />
                                    </FormControl>

                                    <FormControl isRequired w="xs" mt="10" >
                                        <FormLabel >Nacimiento</FormLabel>
                                        <Input type='date' ref={nacimientoRef} />
                                    </FormControl>

                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Telefono</FormLabel>
                                        <Input type='number' defaultValue={0} ref={telefonoRef} />
                                    </FormControl>

                                    <FormControl w="6xl" mt="10" >
                                        <FormLabel >Direccion</FormLabel>
                                        <Input type='text' ref={direccionRef} />
                                    </FormControl>

                                    <FormControl w="6xl" mt="10" >
                                        <FormLabel >Mail</FormLabel>
                                        <Input type='text' ref={mailRef} />
                                    </FormControl>



                                    {
                                        errores ? (

                                            <Alert border='1px' borderColor='black' borderRadius="xl" mt={8} status='error' ariant='left-accent'>
                                                <AlertIcon />
                                                <AlertDescription>{errores}.</AlertDescription>
                                            </Alert>

                                        ) : null
                                    }

                                </Box>

                                <Box className='row' p="4" justifyContent="end" mt="6">

                                    <Button colorScheme='blue' size='md' onClick={registrarCliente} >
                                        Resgistrar
                                    </Button>

                                    <Link href='/stock/listado'>
                                        <Button colorScheme='red' size='md' ml="2" >
                                            Cancelar
                                        </Button>
                                    </Link>

                                </Box>

                            </Box>
                        </>

                    )
                        : null}



            </Container >
        </Box >
    )
}

export default FormNuevoCliente