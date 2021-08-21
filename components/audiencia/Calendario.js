import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Link from "next/link";

const Calendario = ({ events }) => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="container mt-4 p-4 rounden-3 bg-dark">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-white">Calendario de audiencias</h2>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <Link href="/audiencia/nueva" passHref>
            <button className="btn btn-sm btn-block btn-primary">
              Crear Nueva Audiencia
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-4 border border-dark list">
        <Calendar
          style={{ height: "80vh" }}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={{
            next: "Sig",
            previous: "Ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          defaultView="week"
          eventPropGetter={(events) => ({
            style: {
              backgroundColor:
                events.priority === 1
                  ? "#3FD503"
                  : events.priority === 2
                  ? "#E6F82F"
                  : events.priority === 3
                  ? "#F82F2F"
                  : null,
            },
          })}
        />
      </div>
    </div>
  );
};

export default Calendario;
