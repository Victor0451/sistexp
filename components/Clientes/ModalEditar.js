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
    Stack,
    Heading,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Textarea
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalEditar = ({
    row,
    errores,
    nombreRef,
    apellidoRef,
    dniRef,
    telefonoRef,
    direccionRef,
    nacimientoRef,
    mailRef,
    editarCliente,
    activarCliente,
    existeCliente,

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
                colorScheme="yellow"
                size='xs'
                ml="1"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <EditIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del Cliente DNI: {row.dni} - {row.apellido}, {row.nombre}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Cliente</Heading>
                                <Text fontSize={'md'}>
                                    Edita toda la informacion del cliente.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Fecha de Alta</FormLabel>
                                    <Input type='text' defaultValue={moment(row.fecha_alta).format('DD/MM/YYYY')} readOnly />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input type='text' defaultValue={row.apellido} ref={apellidoRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input type='text' defaultValue={row.nombre} ref={nombreRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >DNI <Button size={"xs"} colorScheme="blue" onClick={() => existeCliente(dniRef.current.value)}>Verifica su existencia</Button></FormLabel>
                                    <Input type='number' defaultValue={row.dni} ref={dniRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nacimiento: {moment(row.nacimiento).format('DD/MM/YYYY')}</FormLabel>
                                    <Input type='date' ref={nacimientoRef} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Mail</FormLabel>
                                    <Input type='text' defaultValue={row.mail} ref={mailRef} />
                                </FormControl>

                                {!row.telefono || row.telefono === "" ? (
                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Telefono</FormLabel>
                                        <Input type='number' defaultValue={0} ref={telefonoRef} />
                                    </FormControl>
                                ) : (
                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Telefono</FormLabel>
                                        <Input type='number' defaultValue={row.telefono} ref={telefonoRef} />
                                    </FormControl>
                                )}


                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input type='text' defaultValue={row.direccion} ref={direccionRef} />
                                </FormControl>

                            </Box>

                            {
                                errores ? (

                                    <Alert border='1px' borderColor='black' borderRadius="xl" mt={8} status='error' ariant='left-accent'>
                                        <AlertIcon />
                                        <AlertDescription>{errores}.</AlertDescription>
                                    </Alert>

                                ) : null
                            }

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => editarCliente(row)}>
                                    Editar
                                </Button>

                                <Button colorScheme={"red"} ml="1" onClick={onClose}>Cancelar</Button>

                            </Box>
                        </Container>


                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200" >

                            {
                                row.estado === 0 ? (
                                    <>
                                        <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                            <Heading fontSize={'2xl'}>Activar Usuario</Heading>
                                            <Text fontSize={'md'}>
                                                Reactivar usuarios dados de baja.
                                            </Text>
                                        </Stack>

                                        <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                            <FormControl w="xs" mt="10" >
                                                <FormLabel >Estado</FormLabel>
                                                <Input type='text' defaultValue={"Inactivo"} />
                                            </FormControl>

                                        </Box>

                                        <Box className='row' p="4" justifyContent="end">

                                            <Button colorScheme='blue' size='md' onClick={() => activarCliente(row)}>
                                                Activar Usuario
                                            </Button>

                                        </Box>
                                    </>
                                ) : row.estado === 1 ? (
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
                                            Este usuario actualmente se encuentra activo.
                                        </AlertDescription>
                                    </Alert>
                                ) : null
                            }


                        </Container>

                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ModalEditar