import React, { useEffect } from "react";
import Img from "next/image";

const ModalVerExpediente = ({ exp, cliente, denunciado }) => {
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
              <u>Expediente N°</u>: {exp.idexpediente} - N° {exp.nexpediente},{" "}
              {exp.nombre}
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
              <h4 className="mt-4">Descripcion</h4>
              <div className="row border border-white p-4">
                <div className="col-md-12 ">
                  <label className="mb-2">
                    <u>Descripcion</u>
                  </label>
                  <textarea
                    rows="3"
                    className="form-control"
                    name="descripcion"
                    defaultValue={exp.descripcion}
                    readOnly
                  />
                </div>
              </div>

              <h4 className="mt-4">Cliente</h4>

              <div className="row border border-white p-4">
                <div className="col-md-4 ">
                  <label className="mb-2">
                    <u>Apellido</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    defaultValue={cliente.apellido}
                    readOnly
                  />
                </div>

                <div className=" col-md-4">
                  <label className="mb-2">
                    <u>Nombre</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    defaultValue={cliente.nombre}
                    readOnly
                  />
                </div>
                <div className=" col-md-4">
                  <label className="mb-2">
                    <u>DNI</u>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="dni"
                    defaultValue={cliente.dni}
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
                    defaultValue={cliente.cuit}
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
                    defaultValue={cliente.nacimiento}
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
                    defaultValue={cliente.domicilio}
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
                    defaultValue={cliente.telefono}
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
                    defaultValue={cliente.mail}
                    readOnly
                  />
                </div>
              </div>

              <h4 className="mt-4">Denunciado</h4>

              <div className="row border border-white p-4">
                <div className="col-md-4 ">
                  <label className="mb-2">
                    <u>Apellido</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    defaultValue={denunciado.apellido}
                    readOnly
                  />
                </div>

                <div className=" col-md-4">
                  <label className="mb-2">
                    <u>Nombre</u>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    defaultValue={denunciado.nombre}
                    readOnly
                  />
                </div>
                <div className=" col-md-4">
                  <label className="mb-2">
                    <u>DNI</u>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="dni"
                    defaultValue={denunciado.dni}
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
                    defaultValue={denunciado.cuit}
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
                    defaultValue={denunciado.nacimiento}
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
                    defaultValue={denunciado.domicilio}
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
                    defaultValue={denunciado.telefono}
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
                    defaultValue={denunciado.mail}
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

export default ModalVerExpediente;
