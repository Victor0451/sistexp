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

import { RepeatClockIcon } from '@chakra-ui/icons'
import ListadoMovimientos from './ListadoMovimientos'


const ModalMovimientos = ({
    row,
    fechaMovRef,
    provieneRef,
    derivaRef,
    descripcionMovRef,
    movimientos,
    traerMovimientos,
    regMovimiento,
    bajaMovim

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
                colorScheme="green"
                size='xs'
                ml={1}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerMovimientos(row.idexpediente)

                }}
            >
                <RepeatClockIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del expediente: {row.nexpediente}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">


                            <Stack mt={4} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                                <Text fontSize={'xl'}>
                                    Ingresar Movimientos
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Fecha Mov.</FormLabel>
                                    <Input type='date' ref={fechaMovRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Proviene</FormLabel>
                                    <Input type='text' ref={provieneRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Deriva</FormLabel>
                                    <Input type='text' ref={derivaRef} />
                                </FormControl>

                                <FormControl isRequired w="3xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={5} ref={descripcionMovRef} />
                                </FormControl>

                            </Box>

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => regMovimiento(row)}>
                                    Registrar
                                </Button>

                            </Box>


                        </Container>

                        <Divider mt={4} mb={4} />

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">


                            {movimientos.length === 0 ? (

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
                                        Actualmente no se encuentra ningun movimiento registrado en la base de datos.
                                    </AlertDescription>
                                </Alert>

                            ) : (
                                <>
                                    <Stack mt={4} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                                        <Text fontSize={'xl'}>
                                            Movimientos Registrados
                                        </Text>
                                    </Stack>

                                    <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                        <ListadoMovimientos
                                            listado={movimientos}
                                            bajaMovim={bajaMovim}
                                        />

                                    </Box>
                                </>

                            )}

                        </Container>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent >
            </Modal >
        </>
    )
}

export default ModalMovimientos