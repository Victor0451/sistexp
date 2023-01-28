import React from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,

} from '@chakra-ui/react';

import Tarjetas from './Tarjetas';
import ModalAlertaAgenda from './ModalAlertaAgenda';


const HomeScreen = ({
    listado
}) => {
    return (
        <Box
            p={4}
            mt={5}

        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Sistema de Gestion de Expedientes</Heading>
                <Text fontSize={'xl'}>
                    Por medio de este sistema vas a poder gestionar expedientes, movimientos del mismos. Como asi tambien clintes y denunciados.
                </Text>
            </Stack>


            {listado ? (
                <Alert
                    status='warning'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                    mt={10}

                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ATENCION!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Existen movimientos en tu agenda, revisalos. <ModalAlertaAgenda listado={listado} />
                    </AlertDescription>
                </Alert>
            ) : null}



            <Container maxW={'100%'} mt={10} className="row" justifyContent={"center"} >

            <Box >
                    <Tarjetas
                        imagen={'/img/categoria.jpg'}
                        titulo={"Agenda"}
                        detalle={"Modulo de gestion de agenda"}
                        url={"/agenda/agenda"}
                    />
                </Box>

                <Box >
                    <Tarjetas
                        imagen={'/img/categoria.jpg'}
                        titulo={"Clientes"}
                        detalle={"Modulo de gestion de clientes"}
                        url={"/clientes/listado"}
                    />
                </Box>

                <Box ml="2">
                    <Tarjetas
                        imagen={'/img/proveedor.jpg'}
                        titulo={"Denunciados"}
                        detalle={"Modulo de gestion de denunciados"}
                        url={"/denunciados/listado"}
                    />
                </Box>

                <Box>
                    <Tarjetas
                        imagen={'/img/stock.jpg'}
                        titulo={"Expedientes"}
                        detalle={"Modulo de gestion de expedientes"}
                        url={"/expedientes/listado"}
                    />
                </Box>

            </Container>
        </Box>
    )
}

export default HomeScreen