import React from "react";

const LoginForm = ({ handleLogin, emailRef, loading }) => {
  return (
    <div className="container  p-4">
      <div className="row d-flex justify-content-center p-4">
        <div className="col-6 form-widget rounded-3  p-4 bg-dark">
          <h1 className=" text-white">Iniciar Sesion</h1>
          <p className=" text-white">
            Chequea tu correo para confirmar el inicio de sesion
          </p>
          <div>
            <input
              className="form-control"
              type="email"
              placeholder="Ingresar E-mail"
              ref={emailRef}
            />
          </div>
          <div>
            <button
              onClick={() => handleLogin()}
              className="mt-4 btn btn-secondary"
              disabled={loading}
            >
              <span>{loading ? "Cargando" : "Enviar Link"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
