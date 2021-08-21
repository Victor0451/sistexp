import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="container bg-dark rounded-3 border border-dark mt-4 p-4">
      <div className="alert alert-info text-center text-uppercase">
        Debes Iniciar Sesion para poder usar el sistema
      </div>

      <div className="row text-center border border-dark p-4">
        <div className="col-md-12">
          <h2 className="mb-4 text-white">
            <u>Haz click en el boton para ingresar al sistema</u>
          </h2>
        </div>
        <div className="col-md-12">
          <Link passHref href="/auth/login">
            <button type="button" className="btn btn-info">
              Iniciar Sesion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
