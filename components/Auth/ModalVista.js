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
    Textarea

} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalVista = ({
    row
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
                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del usuario ID: {row.idusuario} - {row.usuario}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input type='text' defaultValue={row.nombre} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input type='text' defaultValue={row.apellido} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Usuario</FormLabel>
                                    <Input type='text' defaultValue={row.usuario} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Fecha de Alta</FormLabel>
                                    <Input type='text' defaultValue={moment(row.alta).format('DD/MM/YYYY')} readOnly />
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