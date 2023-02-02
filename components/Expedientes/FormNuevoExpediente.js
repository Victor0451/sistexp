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
    Select

} from '@chakra-ui/react';

import Link from 'next/link';
import moment from 'moment';

const FormNuevoExpediente = ({
    errores,
    fechaInicioRef,
    nexpediente,
    clienteRef,
    descripcionRef,
    denunciadoRef,
    caratulaRef,
    nexpfisicoRef,
    clientes,
    denun,
    nuevoExpediente
}) => {
    return (
        <Box
            p={4}
            mt={5}
            border='1px' borderColor='black' borderRadius="xl"
            mb={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Alta de Expediente</Heading>
                <Text fontSize={'xl'}>
                    Registro de Expedientes en el sistema.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" p={4} backgroundColor="whiteAlpha.300">


                <Box className='row' p={4} alignItems="center" justifyContent="space-between">

                    <FormControl isRequired w="xs" mt="10"  >
                        <FormLabel >Fecha Inicio</FormLabel>
                        <Input type='date' ref={fechaInicioRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="10"  >
                        <FormLabel >N° Expediente (Sistema)</FormLabel>
                        <Input type='text' value={nexpediente} readOnly />
                    </FormControl>

                    <FormControl w="xs" mt="10"  >
                        <FormLabel >N° Expediente (Fisico)</FormLabel>
                        <Input type='text' ref={nexpfisicoRef} />
                    </FormControl>

                    <FormControl w={"2xl"} mt="10"  >
                        <FormLabel >Caratula</FormLabel>
                        <Input type='text' ref={caratulaRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="10"  >
                        <FormLabel >Cliente</FormLabel>
                        <Select placeholder='Eligue una Opcion...' ref={clienteRef}>

                            {
                                clientes.map((c, index) => (
                                    <option key={index} value={`${c.value}`}>{c.label}</option>
                                ))
                            }


                        </Select>
                    </FormControl>


                    <FormControl isRequired w="xs" mt="10"  >
                        <FormLabel >Denunciado</FormLabel>
                        <Select placeholder='Eligue una Opcion...' ref={denunciadoRef}>

                            {
                                denun.map((c, index) => (
                                    <option key={index} value={`${c.value}`}>{c.label}</option>
                                ))
                            }


                        </Select>
                    </FormControl>

                    <FormControl isRequired w="6xl" mt="10"  >
                        <FormLabel >Descripcion</FormLabel>
                        <Textarea rows={10} ref={descripcionRef} />
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

                    <Button colorScheme='blue' size='md' onClick={nuevoExpediente}>
                        Resgistrar
                    </Button>

                    <Link href='/stock/listado'>
                        <Button colorScheme='red' size='md' ml="2" >
                            Cancelar
                        </Button>
                    </Link>

                </Box>


            </Container >
        </Box >
    )
}

export default FormNuevoExpediente