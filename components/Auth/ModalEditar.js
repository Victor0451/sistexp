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
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalEditar = ({
    row,
    errores,
    errores2,
    contrasenaRef,
    nombreRef,
    apellidoRef,
    editarUsuario,
    activarUsuario,
    contrasenaUsuario,
    repContrasenaRef
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
                    <ModalHeader>Detalles de la categoria ID</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" >

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Categoria</Heading>
                                <Text fontSize={'md'}>
                                    Edita Toda la informacion de la categoria del producto.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Fecha de Alta</FormLabel>
                                    <Input type='text' defaultValue={moment(row.alta).format('DD/MM/YYYY')} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Usuario</FormLabel>
                                    <Input type='text' defaultValue={row.usuario} readOnly />
                                </FormControl>


                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input type='text' defaultValue={row.nombre} ref={nombreRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input type='text' defaultValue={row.apellido} ref={apellidoRef} />
                                </FormControl>





                                {row.estado === 1 ? (
                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Estado</FormLabel>
                                        <Input type='text' defaultValue={"Activo"} readOnly />
                                    </FormControl>
                                ) : row.estado === 0 ? (
                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Estado</FormLabel>
                                        <Input type='text' defaultValue={"Inactivo"} readOnly />
                                    </FormControl>
                                ) : null}

                                {row.estado === 0 ? (
                                    <FormControl w="xs" mt="10" >
                                        <FormLabel >Fecha de Baja</FormLabel>
                                        <Input type='text' defaultValue={moment(row.baja).format('DD/MM/YYYY')} readOnly />
                                    </FormControl>
                                ) : null}

                            </Box>

                            {errores ? (

                                <Alert className='mt-4' status='error' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>{errores}.</AlertDescription>
                                </Alert>

                            ) : null}

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => editarUsuario(row)}>
                                    Editar
                                </Button>

                                <Button colorScheme={"red"} ml="1" onClick={onClose}>Cancelar</Button>

                            </Box>
                        </Container>


                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" >

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

                                            <Button colorScheme='blue' size='md' onClick={() => activarUsuario(row)}>
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


                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" >

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Contraseña</Heading>
                                <Text fontSize={'md'}>
                                    Cambiar contraseña.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Nueva contraseña</FormLabel>
                                    <Input type='password' ref={contrasenaRef} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Repetir contraseña</FormLabel>
                                    <Input type='password' ref={repContrasenaRef} />
                                </FormControl>

                            </Box>

                            {errores2 ? (

                                <Alert className='mt-4' status='error' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>{errores2}.</AlertDescription>
                                </Alert>

                            ) : null}

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => contrasenaUsuario(row)} >
                                    Actualizar Contraseña
                                </Button>

                            </Box>
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