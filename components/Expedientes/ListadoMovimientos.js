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
import BajaMovimiento from './BajaMovimiento';
import ExportarMovExcel from './ExportarMovExcel';



const ListadoMovimientos = ({
  listado,
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
      name: "Fecha Mov.",
      selector: row => `${moment(row.fecha_movimiento).format('DD/MM/YYYY HH:mm:ss')}`,
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
      name: "Proviene",
      selector: row => `${row.proviene}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Deriva",
      selector: row => `${row.deriva}`,
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

          <BajaMovimiento
            row={row}
            bajaMovim={bajaMovim}
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
        <ExportarMovExcel
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

  )
}

export default ListadoMovimientos