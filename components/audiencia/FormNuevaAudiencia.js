import React from "react";

const FormNuevaAudiencia = ({
  descripcion,
  inicio,
  fin,
  expediente,
  prioridad,
  siRef,
  noRef,
  errores,
  expedientes,
  handleBlur,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="container bg-dark rounded-3 p-4">
      <h2 className="text-white">Registrar Nueva Audiencia</h2>

      <div className="row mt-4 border border-white rounded-3 p-4 text-white">
        <div className=" col-md-12">
          <label className="mb-2">
            <u>Descripcion</u>
          </label>
          <textarea
            rows="3"
            className="form-control"
            name="descripcion"
            value={descripcion}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errores.descripcion ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.descripcion}
            </div>
          ) : null}
        </div>

        <div className="mt-4 col-md-4">
          <label className="mb-2">
            <u>Inicio</u>
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="inicio"
            value={inicio}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errores.inicio ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.inicio}
            </div>
          ) : null}
        </div>

        <div className="mt-4 col-md-4">
          <label className="mb-2">
            <u>Fin</u>
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="fin"
            value={fin}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errores.fin ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.fin}
            </div>
          ) : null}
        </div>

        <div className="col-md-2 mt-4 mb-4">
          <label>
            <strong>
              <u>Todo El Dia</u>
            </strong>
          </label>
          <br />
          <div className="form-check ">
            <input
              className="form-check-input "
              type="radio"
              id="covid"
              name="motivo"
              value="option1"
              ref={siRef}
            />
            <label className="form-check-label" htmlFor="si">
              Si
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input "
              type="radio"
              id="covid"
              name="motivo"
              ref={noRef}
              value="option1"
              defaultChecked={true}
            />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>

        {expedientes && expedientes.length !== 0 ? (
          <div className="col-md-4">
            <label>
              <u>Expedientes</u>
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              onBlur={handleBlur}
              name="expediente"
              value={expediente}
            >
              <option value="">Selecciona a un expediente...</option>
              {expedientes.map((ex) => (
                <option
                  key={ex.idexpediente}
                  value={`${ex.nexpediente} - ${ex.ano}`}
                >
                  {ex.nexpediente} - {ex.ano}
                </option>
              ))}
            </select>
            {errores.expediente ? (
              <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
                {errores.expediente}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="col-md-4 alert alert-info text-center text-uppercase text-dark border border-white mt-2">
            No existen expedientes registrados.
          </div>
        )}

        <div className=" col-md-4">
          <label>
            <u>Prioridad</u>
          </label>
          <select
            className="form-select"
            name="prioridad"
            value={prioridad}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option defaultValue="no"> Elige una prioridad </option>

            <option value="1">Normal</option>
            <option value="2">Importante</option>
            <option value="3">Urgente</option>
          </select>
          {errores.prioridad ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.prioridad}
            </div>
          ) : null}
        </div>
        <div className="col-md-12 mt-4 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleSubmit}>
            Registrar
          </button>
          <a className="btn btn-danger">Canelar</a>
        </div>
      </div>
    </div>
  );
};

export default FormNuevaAudiencia;
