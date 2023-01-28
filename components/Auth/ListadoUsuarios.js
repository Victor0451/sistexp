import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Button,
} from '@chakra-ui/react';

import Link from 'next/link';
import moment from 'moment';
import ModalEditar from './ModalEditar';
import ModalVista from './ModalVista';
import BajaUsuarios from './BajaUsuarios';


const ListadoUsuarios = ({
    listado,
    errores,
    errores2,
    contrasenaRef,
    nombreRef,
    apellidoRef,
    editarUsuario,
    activarUsuario,
    bajaUsuario,
    contrasenaUsuario,
    repContrasenaRef
}) => {

    const columns = [

        {
            name: "ID",
            selector: row => `${row.idusuario}`,
            sortable: true,
            grow: 0.1
        },

        {
            name: "Usuario",
            selector: row => `${row.usuario}`,
            sortable: true,
            grow: 0.2
        },
        {
            name: "Nombre",
            selector: row => `${row.nombre}`,
            sortable: true,
            grow: 0.2
        },
        {
            name: "Apellido",
            selector: row => `${row.apellido}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Fecha Alta",
            selector: row => `${moment(row.idusuario).format('DD/MM/YYYY HH:mm:ss')}`,
            sortable: true,
            grow: 0.2
        },


        {
            name: "acciones",
            button: true,
            grow: 0.1,
            cell: row =>
            (
                <>

                    <ModalVista row={row} />

                    <ModalEditar
                        row={row}
                        errores={errores}
                        errores2={errores2}
                        contrasenaRef={contrasenaRef}
                        nombreRef={nombreRef}
                        apellidoRef={apellidoRef}
                        editarUsuario={editarUsuario}
                        activarUsuario={activarUsuario}
                        contrasenaUsuario={contrasenaUsuario}
                        repContrasenaRef={repContrasenaRef}

                    />

                    <BajaUsuarios
                        row={row}
                        bajaUsuario={bajaUsuario}
                    />


                </>

            )
        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

    const filteredItems = listado.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (

            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />

        );
    }, [filterText, resetPaginationToggle]);


    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Listado de Categorias</Heading>
                <Text fontSize={'xl'}>
                    Listado de usuario para su gestion. Para ingresar un nuevo usuario, hace click en el boton. <Link href={"/auth/registrar"}><Button colorScheme={"blue"}>Nuevo Usuario</Button></Link>
                </Text>
            </Stack>

            <Container maxW={'100%'} mt={10}  >
                <DataTable
                    // title="Listado de Clientes"
                    columns={columns}
                    data={filteredItems}
                    defaultSortField="name"
                    striped
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                />
            </Container>
        </Box>
    )
}

export default ListadoUsuarios