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
                    <ModalHeader>Detalles Bitacora ID: {row.idbitacora} - {moment(row.fecha).format('DD/MM/YYYY')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='black' borderRadius="xl" backgroundColor="whiteAlpha.200">


                            <Box mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" >
                                <Box className='row' p={4} alignItems="center" justifyContent="space-between">

                                    <FormControl isRequired w="xs" mt="10" >
                                        <FormLabel >Fecha</FormLabel>
                                        <Input type='text' defaultValue={moment(row.fecha).format('DD/MM/YYYY')} />
                                    </FormControl>

                                    <FormControl isRequired w="xl" mt="10" >
                                        <FormLabel >Titulo</FormLabel>
                                        <Input type='text' defaultValue={row.titulo} />
                                    </FormControl>

                                    <FormControl isRequired w="6xl" mt="10" >
                                        <FormLabel >Descripcion</FormLabel>
                                        <Textarea rows={100} defaultValue={row.descripcion} />

                                    </FormControl>


                                </Box>

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