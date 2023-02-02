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
import BajaExpediente from './BajaExpediente';
import ExportarExcel from './ExportarExcel';
import ModalMovimientos from './ModalMovimientos';


const ListadoExpediente = ({
  listado,
  fechaInicioRef,
  clienteRef,
  descripcionRef,
  denunciadoRef,
  nexpfisicoRef,
  caratulaRef,
  errores,
  traerCliente,
  traerDenun,
  cliente,
  denun,
  clientes,
  denuns,
  movimientos,
  editarExpediente,
  bajaExpediente,
  traerMovimientos,
  fechaMovRef,
  provieneRef,
  derivaRef,
  descripcionMovRef,
  regMovimiento,
  bajaMovim
}) => {
  const columns = [

    {
      name: "ID",
      selector: row => `${row.idexpediente}`,
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
      name: "Fec Inicio",
      selector: row => `${moment(row.fecha_inicio).format('DD/MM/YYYY HH:mm:ss')}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "N° Expediente",
      selector: row => `${row.nexpediente}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Cliente",
      selector: row => `${row.cliente}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Denunciado",
      selector: row => `${row.denun}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "acciones",
      button: true,
      grow: 0.2,
      cell: (row, index) =>
      (
        <>


          <ModalVista
            row={row}
            traerCliente={traerCliente}
            traerDenun={traerDenun}
            cliente={cliente}
            denun={denun}
          />

          <ModalEditar
            row={row}
            fechaInicioRef={fechaInicioRef}
            clienteRef={clienteRef}
            descripcionRef={descripcionRef}
            denunciadoRef={denunciadoRef}
            nexpfisicoRef={nexpfisicoRef}
            caratulaRef={caratulaRef}
            errores={errores}
            clientes={clientes}
            denuns={denuns}
            editarExpediente={editarExpediente}

          />

          <ModalMovimientos
            row={row}
            fechaMovRef={fechaMovRef}
            provieneRef={provieneRef}
            derivaRef={derivaRef}
            descripcionMovRef={descripcionMovRef}
            movimientos={movimientos}
            traerMovimientos={traerMovimientos}
            regMovimiento={regMovimiento}
            bajaMovim={bajaMovim}
          />

          <BajaExpediente
            row={row}
            bajaExpediente={bajaExpediente}
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
        <Heading fontSize={'3xl'}>Listado de Expedientes</Heading>
        <Text fontSize={'xl'}>
          Listado de expedientes registrados en el sistema. Para generar un nuevo expediente, hace click en el boton. <Link href={"/expedientes/nuevo"}><Button colorScheme={"blue"}>Nuevo Expediente</Button></Link>
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
          Si el campo ID esta de color VERDE, el expediente esta ACTIVO. En caso de estar en color ROJO, el expediente esta dado de BAJA.
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

export default ListadoExpediente