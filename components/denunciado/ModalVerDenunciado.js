import React from "react";
import Img from "next/image";

const ModalVerDenunciado = ({ denun }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              <u>Denunciado N°</u>: {denun.iddenunciado} - {denun.apellido},{" "}
              {denun.nombre}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mt-4 bg-dark rounded-3 border border-dark text-white p-4">
              <div className="row">
                <div className="col-md-4 mt-4">
                  <label className="mb-2">
                    <u>Apellido</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    defaultValue={denun.apellido}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>Nombre</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    defaultValue={denun.nombre}
                    readOnly
                  />
                </div>
                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>DNI</u>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="dni"
                    defaultValue={denun.dni}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>CUIT</u>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="cuit"
                    defaultValue={denun.cuit}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>Fecha de Nacimiento</u>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="nacimiento"
                    defaultValue={denun.nacimiento}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>Domicilio</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="domicilio"
                    defaultValue={denun.domicilio}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>Telefono</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    defaultValue={denun.telefono}
                    readOnly
                  />
                </div>

                <div className="mt-4 col-md-4">
                  <label className="mb-2">
                    <u>Mail</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mail"
                    defaultValue={denun.mail}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVerDenunciado;
