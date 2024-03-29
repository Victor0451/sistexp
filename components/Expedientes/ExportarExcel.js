import moment from 'moment';
import React from 'react';
import { downloadExcel } from "react-export-table-to-excel";
import {

    Button,
} from '@chakra-ui/react';

const ExportarPadron = ({ listado }) => {

    const header = ["ID Exp", "ID Cliente", "ID Denunciado", "Cliente", "Denunciado", "N° Expe Sistema", "Fecha Inicio", "Estado", "Descripcion", "Operador", "Caratula", "N° Expe Fisico"];

    const handleDownloadExcel = () => {
        downloadExcel({
            fileName: `Listado Expedientes - ${moment().format('DD/MM/YYYY')}`,
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