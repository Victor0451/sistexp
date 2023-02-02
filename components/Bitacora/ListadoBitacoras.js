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
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import ModalVista from './ModalVista';
import ModalEditar from './ModalEditar';
import BajaBitacoras from './BajaBitacora';
import ExportarExcel from './ExportarExcel';



const ListadoBitacoras = ({
  listado,
  fechaRef,
  tituloRef,
  descripcionRef,
  errores,
  editBitacora,
  contCaracteres,
  bajaBitacora
}) => {
  const columns = [

    {
      name: "ID",
      selector: row => `${row.idbitacora}`,
      sortable: true,
      grow: 0.1
    },

    {
      name: "Fecha",
      selector: row => `${moment(row.fecha).format('DD/MM/YYYY')}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Titulo",
      selector: row => `${row.titulo}`,
      sortable: true,
      grow: 0.3
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
            fechaRef={fechaRef}
            tituloRef={tituloRef}
            descripcionRef={descripcionRef}
            errores={errores}
            editBitacora={editBitacora}
            contCaracteres={contCaracteres}
          />

          <BajaBitacoras
            row={row}
            bajaBitacora={bajaBitacora}
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
        <Heading fontSize={'3xl'}>Listado de Bitacoras</Heading>
        <Text fontSize={'xl'}>
          Listado de bitacoras registrados en el sistema. Para ingresar un nueva bitacora, hace click en el boton. <Link href={"/bitacora/nuevo"}><Button colorScheme={"blue"}>Nueva Bitacora</Button></Link>
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

export default ListadoBitacoras