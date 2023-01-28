import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertDescription
} from '@chakra-ui/react';



const FormInicioSesion = ({
    iniciarSesion,
    usuarioRef,
    contrasenaRef,
    errores

}) => {
    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Iniciar Session</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Sistema de Gestion de Stock.
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Usuario</FormLabel>
                            <Input id='usuario' type='text' ref={usuarioRef} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input id='contrasena' type='password' ref={contrasenaRef} />
                        </FormControl>

                        {errores ? (

                            <Alert className='mt-4' status='error' ariant='left-accent'>
                                <AlertIcon />
                                <AlertDescription>{errores}.</AlertDescription>
                            </Alert>

                        ) : null}

                        <Stack spacing={10}>
                            <Button
                                mt={10}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={() => iniciarSesion()}
                            >
                                Iniciar Session
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>




    )
}

export default FormInicioSesion