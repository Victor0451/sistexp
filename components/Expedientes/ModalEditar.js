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
    Textarea,
    Select
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalEditar = ({
    row,
    fechaInicioRef,
    clienteRef,
    descripcionRef,
    denunciadoRef,
    nexpfisicoRef,
    caratulaRef,
    errores,
    clientes,
    denuns,
    cliente,
    denun,
    editarExpediente

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
                    <ModalHeader>Detalles del Expediente N°: {row.nexpediente}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Expediente</Heading>
                                <Text fontSize={'md'}>
                                    Edita toda la informacion del expediente.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl isRequired w="xs" mt="10"  >
                                    <FormLabel >Fecha Inicio: {moment(row.fecha_inicio).format('DD/MM/YYYY HH:mm')}</FormLabel>
                                    <Input type='date' ref={fechaInicioRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10"  >
                                    <FormLabel >N° Expediente (Sistema)</FormLabel>
                                    <Input type='text' value={row.nexpediente} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10"  >
                                    <FormLabel >N° Expediente (Fisico)</FormLabel>
                                    <Input type='text' defaultValue={row.nexpfisico} ref={nexpfisicoRef} />
                                </FormControl>

                                <FormControl w={"sm"} mt="10"  >
                                    <FormLabel >Caratula</FormLabel>
                                    <Input type='text' defaultValue={row.caratula} ref={caratulaRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10"  >
                                    <FormLabel >Cliente: {row.cliente}</FormLabel>
                                    <Select placeholder='Eligue una Opcion...' ref={clienteRef}>

                                        {
                                            clientes.map((c, index) => (
                                                <option key={index} value={`${c.value}`}>{c.label}</option>
                                            ))
                                        }


                                    </Select>
                                </FormControl>


                                <FormControl isRequired w="xs" mt="10"  >
                                    <FormLabel >Denunciado: {row.denun}</FormLabel>
                                    <Select placeholder='Eligue una Opcion...' ref={denunciadoRef}>

                                        {
                                            denuns.map((c, index) => (
                                                <option key={index} value={`${c.value}`}>{c.label}</option>
                                            ))
                                        }


                                    </Select>
                                </FormControl>

                                <FormControl isRequired w="6xl" mt="10"  >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={10} defaultValue={row.descripcion} ref={descripcionRef} />
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

                                <Button colorScheme='blue' size='md' onClick={() => editarExpediente(row)}>
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
                                                Reactivar expediente dado de baja.
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
                                                Activar Expediente
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
                                            Este expediente actualmente se encuentra activo.
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