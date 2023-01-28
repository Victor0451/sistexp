import React from "react";

const RedirectToLogin = () => {
  return (
    <div className="container d-flex justify-content-center ">
      <div className=" border border-dark p-4 mt-4 mb-4 list ">
        <h1 className="text-center">
          <strong>
            <u>
              No estas logueado, debes iniciar session para acceder al sistema
            </u>
          </strong>
        </h1>

        <div className="d-flex justify-content-center">
          <img
            src="/img/logerr.jpg"
            className="logerr mt-4 mb-4 border border-dark 
        "
          />
        </div>

        <div className="mt-4 mb-4 d-flex justify-content-center">
          <a href="/" className="btn btn-primary">
            Iniciar Session
          </a>
        </div>
      </div>
    </div>
  );
};

export default RedirectToLogin;
