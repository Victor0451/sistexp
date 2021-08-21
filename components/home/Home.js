import React, { useContext } from "react";
import Img from "next/image";
import Link from "next/link";
import Alert from "./Alert";

const Home = ({ session, events }) => {
  return (
    <div className="container bg-dark rounded-3  p-4">
      <h2 className="text-white">Bienvenido {session.email} </h2>

      <Alert events={events} />

      <div className="row mt-4 border border-white rounded-3 p-4">
        <div className="col-md-3">
          <div className="card">
            <Img
              src="/img/cliente.jpg"
              className="card-img-top"
              width="300"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">
                Puede ver, agregar y/o modificar Clientes
              </p>
              <Link href="/cliente/listado">
                <a className="btn btn-primary">Ver Clientes</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Img
              src="/img/denunciado.jpg"
              className="card-img-top"
              width="300"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Denunciados</h5>
              <p className="card-text">
                Puede ver, agregar y/o modificar Denunciados
              </p>
              <Link href="/denunciado/listado">
                <a className="btn btn-primary">Ingresar</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="card">
            <Img
              src="/img/personal.jpg"
              className="card-img-top"
              width="300"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Personal</h5>
              <p className="card-text">Gestion del personal laboral.</p>
              <Link href="/personal/listado">
                <a className="btn btn-primary">Ingresar</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="card">
            <Img
              src="/img/expediente.jpg"
              className="card-img-top"
              width="300"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title"> Expedientes</h5>
              <p className="card-text">Gestion expedientes registrados.</p>
              <Link href="#">
                <a className="btn btn-primary">Ingresar</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mt-2">
          <div className="card">
            <Img
              src="/img/audiencia.jpg"
              className="card-img-top"
              width="300"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Audiencias</h5>
              <p className="card-text">Gestion Audiencias.</p>
              <Link href="/audiencia/calendario">
                <a className="btn btn-primary">Ingresar</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
