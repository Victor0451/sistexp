import React from "react";

const FormNuevoDenunciado = ({
  errores,
  apellido,
  nombre,
  dni,
  cuit,
  domicilio,
  telefono,
  nacimiento,
  mail,
  handleBlur,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="container mt-4 bg-dark text-white rounded-3 p-4">
      <h2 className="mb-4">Registrar Denunciado</h2>

      <div className="row border border-white p-2">
        <div className="col-md-4 mt-4">
          <label>
            <u>Apellido</u>
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            name="apellido"
            value={apellido}
          />
          {errores.apellido ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.apellido}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Nombre</u>
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            name="nombre"
            value={nombre}
          />
          {errores.nombre ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.nombre}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Fecha de Nacimiento</u>
          </label>
          <input
            className="form-control"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            name="nacimiento"
            value={nacimiento}
          />
          {errores.nacimiento ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.nacimiento}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>DNI</u>
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="dni"
            value={dni}
          />
          {errores.dni ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.dni}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>CUIL</u>
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="cuit"
            value={cuit}
          />
          {errores.cuit ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.cuit}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Mail</u>
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            name="mail"
            value={mail}
          />
          {errores.mail ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.mail}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Domicilio</u>
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            name="domicilio"
            value={domicilio}
          />
          {errores.domicilio ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.domicilio}
            </div>
          ) : null}
        </div>

        <div className="col-md-4 mt-4">
          <label>
            <u>Telefono</u>
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            name="telefono"
            value={telefono}
          />
          {errores.telefono ? (
            <div className="alert alert-danger text-center text-uppercase text-dark border border-white mt-2">
              {errores.telefono}
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

export default FormNuevoDenunciado;
