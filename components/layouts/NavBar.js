import React, { useContext } from "react";
import { SupabaseContext } from "../../config/supabaseClient";
import Link from "next/link";
import Img from "next/image";

const NavBar = () => {
  const { session } = useContext(SupabaseContext);

  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <Link href="/">
        <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
      </Link>
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        id="menu"
      >
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Home</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            href="#submenu1"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle"
          >
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Clientes</span>{" "}
          </a>

          <ul
            className="collapse show nav flex-column ms-1"
            id="submenu1"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link href="/cliente/nuevo">
                <a className="nav-link px-3">
                  -{" "}
                  <span className="d-none d-sm-inline"> Registrar Cliente</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cliente/listado">
                <a className="nav-link px-3">
                  {" "}
                  - <span className="d-none d-sm-inline">Listado</span>{" "}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu2"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle"
          >
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Denunciados</span>{" "}
          </a>

          <ul
            className="collapse show nav flex-column ms-1"
            id="submenu2"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link href="/denunciado/nuevo">
                <a className="nav-link px-3">
                  -{" "}
                  <span className="d-none d-sm-inline">
                    {" "}
                    Registrar Denunciados
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/denunciado/listado">
                <a className="nav-link px-3">
                  {" "}
                  - <span className="d-none d-sm-inline">Listado</span>{" "}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu3"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle"
          >
            <i className="fs-4 bi-grid"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Personal</span>{" "}
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu3"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link href="/personal/nuevo">
                <a className="nav-link px-3">
                  {" "}
                  -{" "}
                  <span className="d-none d-sm-inline">Registrar Personal</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/personal/listado">
                <a className="nav-link px-3">
                  {" "}
                  - <span className="d-none d-sm-inline">Listado</span>{" "}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu4"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle"
          >
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Expediente</span>{" "}
          </a>

          <ul
            className="collapse show nav flex-column ms-1"
            id="submenu4"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link href="/expediente/nuevo">
                <a className="nav-link px-3">
                  -{" "}
                  <span className="d-none d-sm-inline">
                    {" "}
                    Registrar Expediente
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/expediente/listado">
                <a className="nav-link px-3">
                  {" "}
                  - <span className="d-none d-sm-inline">Listado</span>{" "}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu5"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle"
          >
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Audiencias</span>{" "}
          </a>

          <ul
            className="collapse show nav flex-column ms-1"
            id="submenu5"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link href="/audiencia/nueva">
                <a className="nav-link px-3">
                  -{" "}
                  <span className="d-none d-sm-inline"> Agendar Audiencia</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/audiencia/calendario">
                <a className="nav-link px-3">
                  {" "}
                  -{" "}
                  <span className="d-none d-sm-inline">
                    Calendario de Audiencias
                  </span>{" "}
                </a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <hr />

      {session ? (
        <div className="dropdown pb-4">
          <Link href="#">
            <a
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1">{session.email}</span>
            </a>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <Link href="/auth/cuenta">
                <a className="dropdown-item">Cuenta</a>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={async () => {
                  await firebase.logout();
                }}
              >
                Cerrar Sesion
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link href="/auth/login">
            <a className="btn btn-secondary mb-4">Iniciar Sesion</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
