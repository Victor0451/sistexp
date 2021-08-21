import "../styles/globals.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-table/react-table.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SupabaseContext } from "../config/supabaseClient";
import React from "react";
import useAutenticacion from "../hooks/useAutenticacion";

const MyApp = ({ Component, pageProps }) => {
  const session = useAutenticacion();

  return (
    <SupabaseContext.Provider value={{ session }}>
      <Component {...pageProps} />
    </SupabaseContext.Provider>
  );
};

export default MyApp;
