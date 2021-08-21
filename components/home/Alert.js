import React from "react";
import ModalVerAudiencias from "./ModalVerAudiencias";

const Alert = ({ events }) => {
  if (events.length === 0)
    return (
      <div className="row mt-4 border border-white rounded-3 p-4">
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Novedades!</h4>
          <p>Hoy no tienes audiencias agendadas</p>
          <hr />
          <p className="mb-0"></p>
        </div>
      </div>
    );

  return (
    <div className="row mt-4 border border-white rounded-3 p-4">
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">Novedades!</h4>
        <hr />
        <p>Hoy tienes audiencias agendadas</p>
        <button
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Ver
        </button>
        <hr />
        <p className="mb-0"></p>
      </div>

      <ModalVerAudiencias events={events} />
    </div>
  );
};

export default Alert;
