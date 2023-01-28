import moment from 'moment';
import React from 'react';
import { downloadExcel } from "react-export-table-to-excel";
import {

    Button,
} from '@chakra-ui/react';

const ExportarPadron = ({ listado }) => {

    const header = ["N°", "Apellido", "Nombre", "DNI", "Direccion", "Telefono", "Fec. Nacimiento", "Mail", "Fec. Alta", "Estado", "Fec. Baja"];

    const handleDownloadExcel = () => {
        downloadExcel({
            fileName: `Listado Denunciados - ${moment().format('DD/MM/YYYY')}`,
            sheet: "Listado",
            tablePayload: {
                header,
                // accept two different data structures
                body: listado
            },
        });
    }

    return (
        <Button size={"md"} colorScheme={"green"} onClick={handleDownloadExcel}>Descargar Excel</Button>
    );
};

export default ExportarPadron;