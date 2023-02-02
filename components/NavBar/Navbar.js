import React, { useState } from 'react'
import {
    useColorMode,
    Flex,
    IconButton,
    Box,
    useMediaQuery
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import toastr from 'toastr'
import Opciones from './Opciones'
import MenuDesk from './MenuDesk'
import MenuResp from './MenuResp'


const Navbar = ({ f }) => {


    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [display, changeDisplay] = useState('none')

    const cerrarSesion = () => {

        jsCookie.remove("token")
        jsCookie.remove("usuario")

        toastr.info("Sesion cerrada correctamente", "ATENCION")

        setTimeout(() => {
            Router.push('/')
        }, 1000);


    }

    const [resp] = useMediaQuery('(min-width: 767px)')

    return (

        <Box className='row'>

            <Flex className='col-md-10'>
                <Flex
                    //position="fixed"
                    top="1rem"
                    right="1rem"
                    align="center"

                >
                    {/* Desktop */}
                    <Flex
                        display={['none', 'none', 'flex', 'flex']}

                    >


                        <MenuDesk />




                    </Flex>

                    {/* Mobile */}
                    <IconButton
                        aria-label="Open Menu"
                        size="lg"
                        mr={2}
                        icon={
                            <HamburgerIcon />
                        }
                        onClick={() => changeDisplay('flex')}
                        display={['flex', 'flex', 'none', 'none']}
                    />

                </Flex>

                {/* Mobile Content */}
                <MenuResp
                    display={display}
                    changeDisplay={changeDisplay}
                    cerrarSesion={cerrarSesion}
                    f={f}
                />

            </Flex>



            <>
                {resp === true && f === 1 ? (

                    <Opciones
                        cerrarSesion={cerrarSesion}
                        isDark={isDark}
                        toggleColorMode={toggleColorMode}

                    />
                ) : null}
            </>








        </Box >


    )
}
export default Navbar