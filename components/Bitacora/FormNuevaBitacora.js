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

const FormNuevaBitacora = ({
    fechaRef,
    tituloRef,
    descripcionRef,
    errores,
    contCaracteres,
    regBitacora
}) => {
    return (
        <Box
            p={4}
            mt={5}
            border='1px' borderColor='black' borderRadius="xl"
            mb={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Bitacora</Heading>
                <Text fontSize={'xl'}>
                    Registro de bitacora.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" p={4} backgroundColor="whiteAlpha.300">


                <Box mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" >
                    <Box className='row' p={4} alignItems="center" justifyContent="space-between">

                        <FormControl isRequired w="xs" mt="10" >
                            <FormLabel >Fecha</FormLabel>
                            <Input type='date' ref={fechaRef} />
                        </FormControl>

                        <FormControl isRequired w="xl" mt="10" >
                            <FormLabel >Titulo</FormLabel>
                            <Input type='text' ref={tituloRef} />
                        </FormControl>

                        <FormControl isRequired w="6xl" mt="10" >
                            <FormLabel >Descripcion</FormLabel>
                            <Textarea rows={1000} ref={descripcionRef} id="mensaje" onChange={contCaracteres} maxLength="10000" />
                            <FormLabel mt={1} id="contador" >0/10000</FormLabel>

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

                        <Button colorScheme='blue' size='md' onClick={regBitacora} >
                            Resgistrar
                        </Button>

                        <Link href='/stock/listado'>
                            <Button colorScheme='red' size='md' ml="2" >
                                Cancelar
                            </Button>
                        </Link>

                    </Box>

                </Box>

            </Container >
        </Box >
    )
}

export default FormNuevaBitacora