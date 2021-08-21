import React from "react";

const FormNuevoExpediente = ({
  errores,
  fechaInicio,
  nexpediente,
  ano,
  cliente,
  descripcion,
  denunciado,
  estado,
  handleBlur,
  handleChange,
  handleSubmit,
  clientes,
  denunciados,
}) => {
  return (
    <div className="container bg-dark rounded-3 mt-4 text-white  p-4">
      <h2>Crear Expediente</h2>

      <div className="row mt-4 border border-white p-2">
        <div className="col-md-4 mt-4">
          <label>
            <u>Fecha Inicio</u>
          </label>
          <input
            className="form-control"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            name="fechaInicio"
            value={fechaInicio}
          />
          {errores.fechaInicio ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.fechaInicio}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>N° Expediente</u>
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="nexpediente"
            value={nexpediente}
          />
          {errores.nexpediente ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.nexpediente}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Año</u>
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="ano"
            value={ano}
          />
          {errores.ano ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.ano}
            </div>
          ) : null}
        </div>

        {clientes && clientes.length !== 0 ? (
          <div className="col-md-4 mt-4">
            <label>
              <u>Cliente</u>
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              onBlur={handleBlur}
              name="cliente"
              value={cliente}
            >
              <option value="">Selecciona a un cliente...</option>
              {clientes.map((cl) => (
                <option key={cl.idcliente} value={cl.idcliente}>
                  {cl.apellido}, {cl.nombre}
                </option>
              ))}
            </select>
            {errores.cliente ? (
              <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
                {errores.cliente}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="col-md-4 alert alert-info text-center text-uppercase text-dark border border-white mt-2">
            No existen clientes registrados, no podra crear el expediente.
          </div>
        )}

        {denunciados && denunciados.length !== 0 ? (
          <div className="col-md-4 mt-4">
            <label>
              <u>Denunciado</u>
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              onBlur={handleBlur}
              name="denunciado"
              value={denunciado}
            >
              <option value="">Selecciona a un denunciado...</option>
              {denunciados.map((dn) => (
                <option key={dn.iddenunciado} value={dn.iddenunciado}>
                  {dn.apellido}, {dn.nombre}
                </option>
              ))}
            </select>
            {errores.denunciado ? (
              <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
                {errores.denunciado}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="col-md-4 alert alert-info text-center text-uppercase text-dark border border-white mt-2">
            No existen denunciados registrados, no podra crear el expediente.
          </div>
        )}

        <div className="col-md-12 mt-4">
          <label>
            <u>Descripcion</u>
          </label>
          <textarea
            className="form-control"
            rows="3"
            onChange={handleChange}
            onBlur={handleBlur}
            name="descripcion"
            value={descripcion}
          />
          {errores.descripcion ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.descripcion}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Estado</u>
          </label>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
            onBlur={handleBlur}
            name="estado"
            value={estado}
          >
            <option selected>Selecciona un estado...</option>
            <option value="Archivo">Archivo</option>
            <option value="Audiencia">Audiencia</option>
            <option value="Dictamen">Dictamen</option>
            <option value="Traslado">Traslado</option>
          </select>

          {errores.estado ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.estado}
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

export default FormNuevoExpediente;
