import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useColorModeValue,
    Button
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'

const BajaUsuarios = ({
    bajaUsuario,
    row
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    return (
        <>
            <Button
                colorScheme="red"
                size='xs'
                ml="1"
                onClick={onOpen}
            >
                <DeleteIcon />
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}

            >
                <AlertDialogOverlay>
                    <AlertDialogContent
                        color={useColorModeValue('black', 'white')}
                    >
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Atencion!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Estas seguro que deseas dar de baja el producto?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => bajaUsuario(row)} onClickCapture={onClose} ml={3}>
                                Aceptar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default BajaUsuarios