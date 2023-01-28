import React from 'react'
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'

const MenuDesk = ({ }) => {

    return (
        <Menu>

            <Link href="/home/home" passHref>
                <Button
                    colorScheme='gray'
                >
                    Home
                </Button>
            </Link>

            <Menu>
                <MenuButton ml={1} as={Button} rightIcon={<ChevronDownIcon />}>
                    Agenda
                </MenuButton>
                <MenuList>
                    <Link href="/agenda/agenda">
                        <MenuItem>Ver Eventos</MenuItem>
                    </Link>
                </MenuList>
            </Menu>

            <Menu>
                <MenuButton ml={1} as={Button} rightIcon={<ChevronDownIcon />}>
                    Clientes
                </MenuButton>
                <MenuList>
                    <Link href="/clientes/nuevo">
                        <MenuItem>Nuevo cliente</MenuItem>
                    </Link>
                    <Link href="/clientes/listado">
                        <MenuItem>Listado de clientes</MenuItem>
                    </Link>
                </MenuList>
            </Menu>

            <Menu>
                <MenuButton ml={1} as={Button} rightIcon={<ChevronDownIcon />}>
                    Denunciados
                </MenuButton>
                <MenuList>
                    <Link href="/denunciados/nuevo">
                        <MenuItem>Nuevo denunciado</MenuItem>
                    </Link>
                    <Link href="/denunciados/listado">
                        <MenuItem>Listado de denunciados</MenuItem>
                    </Link>
                </MenuList>
            </Menu>

            <Menu>
                <MenuButton ml={1} as={Button} rightIcon={<ChevronDownIcon />}>
                    Expedientes
                </MenuButton>
                <MenuList>
                    <Link href="/expedientes/nuevo">
                        <MenuItem>Nuevo exprediente</MenuItem>
                    </Link>
                    <Link href="/expedientes/listado">
                        <MenuItem>Listado de expedientes</MenuItem>
                    </Link>
                </MenuList>
            </Menu>

        </Menu>
    )
}

export default MenuDesk