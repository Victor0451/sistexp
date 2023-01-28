import React from 'react'
import {
    Flex,
    Button,
    IconButton,

} from '@chakra-ui/react'
import Link from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'

const MenuResp = ({
    display,
    changeDisplay
}) => {

    return (
        <Flex
            w='100vw'
            display={display}
            bgColor="gray.50"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column"
        >
            <Flex justify="flex-end" >
                <IconButton
                    mt={2}
                    mr={2}
                    aria-label="Open Menu"
                    size="lg"
                    icon={
                        <CloseIcon
                            color={"black"}
                        />
                    }
                    onClick={() => changeDisplay('none')}
                />
            </Flex>


            <Flex
                flexDir="column"
                align="center"
            >
                <Link href="/home/home" passHref>
                    <Button

                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                        color={"black"}

                    >
                        Home
                    </Button>
                </Link>

                <Link href="/clientes/listado" passHref>
                    <Button

                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                        color={"black"}

                    >
                        Clientes
                    </Button>
                </Link>

                <Link href="/denunciados/listado" passHref>
                    <Button

                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                        color={"black"}

                    >
                        Denunciados
                    </Button>
                </Link>

                <Link href="/expedientes/listado" passHref>
                    <Button

                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                        color={"black"}

                    >
                        Expedientes
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )
}

export default MenuResp