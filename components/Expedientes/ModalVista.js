import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Container,
    Box,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    Textarea,
    Stack,
    Heading,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Text,
    Divider


} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'
import Link from 'next/link'


const ModalVista = ({
    row,
    traerCliente,
    traerDenun,
    cliente,
    denun,
}) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)



    return (
        <>
            <Button
                colorScheme="blue"
                size='xs'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerCliente(row.idcliente)
                    traerDenun(row.iddenunciado)
                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del expediente: {row.nexpediente}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">


                            <Stack mt={4} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                                <Text fontSize={'xl'}>
                                    Detalles del Expediente
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >N° Expediente (Sistema)</FormLabel>
                                    <Input type='text' defaultValue={row.nexpediente} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10"  >
                                    <FormLabel >N° Expediente (Fisico)</FormLabel>
                                    <Input type='text' defaultValue={row.nexpfisico} />
                                </FormControl>

                                <FormControl w={"sm"} mt="10"  >
                                    <FormLabel >Caratula</FormLabel>
                                    <Input type='text' defaultValue={row.caratula} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Fecha de Inicio</FormLabel>
                                    <Input type='text' defaultValue={moment(row.fecha_inicio).format('DD/MM/YYYY HH:mm')} readOnly />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={5} type='text' defaultValue={row.descripcion} readOnly />
                                </FormControl>

                            </Box>


                            <Divider mt={4} mb={4} />

                            {cliente ? (
                                <>
                                    <Stack mt={4} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>

                                        <Text fontSize={'xl'}>
                                            Detalles del Cliente
                                        </Text>
                                    </Stack>

                                    <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Apellido y Nombre</FormLabel>
                                            <Input type='text' defaultValue={`${cliente.apellido}, ${cliente.nombre}`} readOnly />                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >DNI</FormLabel>
                                            <Input type='text' defaultValue={cliente.dni} readOnly />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Telefono</FormLabel>
                                            <Input type='text' defaultValue={cliente.telefono} readOnly />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Direccion</FormLabel>
                                            <Input type='text' defaultValue={cliente.direccion} readOnly />
                                        </FormControl>

                                    </Box>
                                </>
                            ) : (

                                <Alert
                                    mt="10"
                                    mb="10"
                                    status='info'
                                    variant='subtle'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                    textAlign='center'
                                    height='200px'
                                    border='1px'
                                    borderColor='black'
                                    borderRadius="xl"
                                >
                                    <AlertIcon boxSize='40px' mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                                        ATENCION!
                                    </AlertTitle>
                                    <AlertDescription maxWidth='sm'>
                                        Actualmente no se encuentra ningun cliente registrado en la base de datos.
                                        <Link href={'/clientes/nuevo'}>
                                            <Button colorScheme={"blue"} >
                                                Registrar Cliente
                                            </Button>
                                        </Link>
                                    </AlertDescription>
                                </Alert>

                            )}

                            <Divider mt={4} mb={4} />

                            {denun ? (
                                <>
                                    <Stack mt={4} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>

                                        <Text fontSize={'xl'}>
                                            Detalles del Denunciado
                                        </Text>
                                    </Stack>

                                    <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Apellido y Nombre</FormLabel>
                                            <Input type='text' defaultValue={`${denun.apellido}, ${denun.nombre}`} readOnly />                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >DNI</FormLabel>
                                            <Input type='text' defaultValue={denun.dni} readOnly />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Telefono</FormLabel>
                                            <Input type='text' defaultValue={denun.telefono} readOnly />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Direccion</FormLabel>
                                            <Input type='text' defaultValue={denun.direccion} readOnly />
                                        </FormControl>

                                    </Box>
                                </>
                            ) : (

                                <Alert
                                    mt="10"
                                    mb="10"
                                    status='info'
                                    variant='subtle'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                    textAlign='center'
                                    height='200px'
                                    border='1px'
                                    borderColor='black'
                                    borderRadius="xl"
                                >
                                    <AlertIcon boxSize='40px' mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                                        ATENCION!
                                    </AlertTitle>
                                    <AlertDescription maxWidth='sm'>
                                        Actualmente no se encuentra ningun denunciado registrado en la base de datos.
                                        <Link href={'/denunciados/nuevo'}>
                                            <Button colorScheme={"blue"} >
                                                Registrar Cliente
                                            </Button>
                                        </Link>
                                    </AlertDescription>
                                </Alert>

                            )}



                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalVista