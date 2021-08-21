// import React, { useEffect, useState } from "react";
// import firebase from "../firebase/index";

// function useAutenticacion() {
//   const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

//   useEffect(() => {
//     const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
//       if (usuario) {
//         guardarUsuarioAutenticado(usuario);
//       } else {
//         guardarUsuarioAutenticado(null);
//       }
//     });
//     return () => unsuscribe();
//   }, []);

//   return usuarioAutenticado;
// }

// export default useAutenticacion;

import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

function useAutenticacion() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const storage = window.localStorage.getItem("supabase.auth.token");

    if (storage) {
      const session = JSON.parse(storage);

      guardarUsuarioAutenticado(session.currentSession.user);
    } else {
      guardarUsuarioAutenticado(null);
    }
  }, []);

  return usuarioAutenticado;
}

export default useAutenticacion;
