import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import ModalVista from './ModalVista';
import ModalEditar from './ModalEditar';
import BajaClientes from './BajaClientes';
import ExportarExcel from './ExportarExcel';


const ListadoClientes = ({
  listado,
  nombreRef,
  apellidoRef,
  dniRef,
  telefonoRef,
  direccionRef,
  nacimientoRef,
  mailRef,
  editarCliente,
  activarCliente,
  bajaCliente,
  existeCliente,
  errores
}) => {
  const columns = [

    {
      name: "ID",
      selector: row => `${row.idcliente}`,
      conditionalCellStyles: [
        {
          when: row => row.estado === 0,
          style: {
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
        {
          when: row => row.estado === 1,
          style: {
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ],
      sortable: true,
      grow: 0.1
    },

    {
      name: "Cliente",
      selector: row => `${row.apellido}, ${row.nombre}`,
      sortable: true,
      grow: 0.3
    },
    {
      name: "DNI",
      selector: row => `${row.dni}`,
      sortable: true,
      grow: 0.2
    },
    {
      name: "Alta",
      selector: row => `${moment(row.precio_venta).format('DD/MM/YYYY')}`,
      sortable: true,
      grow: 0.2
    },
    {
      name: "acciones",
      button: true,
      grow: 0.1,
      cell: (row, index) =>
      (
        <>


          <ModalVista
            row={row}
          />

          <ModalEditar
            row={row}
            nombreRef={nombreRef}
            apellidoRef={apellidoRef}
            dniRef={dniRef}
            telefonoRef={telefonoRef}
            direccionRef={direccionRef}
            nacimientoRef={nacimientoRef}
            mailRef={mailRef}
            editarCliente={editarCliente}
            activarCliente={activarCliente}
            bajaCliente={bajaCliente}
            existeCliente={existeCliente}
            errores={errores}
          />

          <BajaClientes
            row={row}
            bajaCliente={bajaCliente}
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

      <>
        <ExportarExcel
          listado={listado}
        />

        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />



      </>


    );
  }, [filterText, resetPaginationToggle]);

  return (
    <Box
      p={4}
      mt={5}
      border='1px' borderColor='black' borderRadius="xl"
      mb={4}
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Listado de Clientes</Heading>
        <Text fontSize={'xl'}>
          Listado de Clientes registrados en el sistema. Para ingresar un nuevo cliente, hace click en el boton. <Link href={"/clientes/nuevo"}><Button colorScheme={"blue"}>Nuevo Cliente</Button></Link>
        </Text>
      </Stack>

      <Alert
        mt="10"
        mb="10"
        status='info'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
        border='1px'
        borderColor='black'
        borderRadius="xl"
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          ATENCION!
        </AlertTitle>
        <AlertDescription textAlign="justify">
          Si el campo ID esta de color VERDE, el cliente esta ACTIVO. En caso de estar en color ROJO, el cliente esta dado de BAJA.
        </AlertDescription>
      </Alert>

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

export default ListadoClientes