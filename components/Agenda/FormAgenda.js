import React from 'react'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import es from "@fullcalendar/core/locales/es"
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

const FormAgenda = ({
    edit,
    events,
    handleDateSelect,
    selEvent,
    editEnable,
    delet,
    deleteEnable,

}) => {
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
                    Listado de Clientes registrados en el sistema. Para ingresar un nuevo cliente, hace click en el boton.
                </Text>
            </Stack>

            <Container border='1px' borderColor='black' borderRadius="xl" p="4" maxW={'100%'} mt={10}  >

                <Stack mt={4} border='1px' borderColor='black' borderRadius="xl" p="4" spacing={4} as={Container} textAlign={'center'}>
                    <Text fontSize={'xl'}>
                        Opciones
                    </Text>
                    <Box className='row' p={4} justifyContent="center">

                        <Button colorScheme='yellow' size='md' onClick={() => { editEnable() }} >
                            Editar
                        </Button>


                        <Button colorScheme='red' size='md' ml="2" onClick={() => { deleteEnable() }}>
                            Eliminar
                        </Button>
                    </Box>


                </Stack>


                {edit === true ? (

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
                            Activaste el modo edicion, ahora puedes editar la fecha y hora de tus eventos registrados.  Puedes cambiar la fecha y hora del evento simplemente arrastrandolo y/o expandiendolo.
                            Para registrar la modificacion solo deberas hacer click en el evento y se te notificara cuando se haya realizado exitosamente
                        </AlertDescription>
                    </Alert>

                ) : null}



                {delet === true ? (

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
                            Activaste el modo eliminacion, ahora puedes editar la fecha y hora de tus eventos registrados.  Puedes cambiar la fecha y hora del evento simplemente arrastrandolo y/o expandiendolo.
                            Para registrar la modificacion solo deberas hacer click en el evento y se te notificara cuando se haya realizado exitosamente
                        </AlertDescription>
                    </Alert>
                ) : null}


                <Box maxW={'100%'} mt={10} backgroundColor="whiteAlpha.300" p={4} border='1px' borderColor='black' borderRadius="xl">

                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='timeGridWeek'
                        editable={edit}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateSelect}
                        events={events}
                        locale={es}
                        eventClick={selEvent}
                    />


                </Box>

            </Container>
        </Box >



    )
}

export default FormAgenda