import React, { useEffect, useState } from "react";
import jsCookie from "js-cookie";

function useAutenticacion() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  useEffect(() => {
    let usuario = jsCookie.get("usuario");
    if (usuario) {
      guardarUsuarioAutenticado(usuario);
    } else {
      guardarUsuarioAutenticado(null);
    }
  }, [usuarioAutenticado]);

  return usuarioAutenticado;
}

export default useAutenticacion;
