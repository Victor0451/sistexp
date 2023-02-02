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
import Link from 'next/link'


const ModalEditar = ({
    row,
    fechaRef,
    tituloRef,
    descripcionRef,
    errores,
    editBitacora,
    contCaracteres,

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
                    <ModalHeader>Detalles Bitacora ID: {row.idbitacora} - {moment(row.fecha).format('DD/MM/YYYY')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Bitacora</Heading>
                                <Text fontSize={'md'}>
                                    Edita toda la informacion de la bitacora.
                                </Text>
                            </Stack>

                            <Box mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" >
                                <Box className='row' p={4} alignItems="center" justifyContent="space-between">

                                    <FormControl isRequired w="xs" mt="10" >
                                        <FormLabel >Fecha</FormLabel>
                                        <Input type='date' ref={fechaRef} defaultValue={moment(row.fecha).format('YYYY-MM-DD')}/>
                                    </FormControl>

                                    <FormControl isRequired w="xl" mt="10" >
                                        <FormLabel >Titulo</FormLabel>
                                        <Input type='text' ref={tituloRef} defaultValue={row.titulo} />
                                    </FormControl>

                                    <FormControl isRequired w="6xl" mt="10" >
                                        <FormLabel >Descripcion</FormLabel>
                                        <Textarea rows={100} ref={descripcionRef} id="mensaje" defaultValue={row.descripcion} onChange={contCaracteres} maxLength="10000" />
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

                                <Button colorScheme='blue' size='md' onClick={() => editBitacora(row)}>
                                    Editar
                                </Button>

                                <Button colorScheme={"red"} ml="1" onClick={onClose}>Cancelar</Button>

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