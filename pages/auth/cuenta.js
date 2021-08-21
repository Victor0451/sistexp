import React, { useContext } from "react";
import Layout from "../../components/layouts/Layout";
import GestionCuenta from "../../components/auth/GestionCuenta";
import { SupabaseContext } from "../../config/supabaseClient";
import ErrorPage from "../../components/layouts/ErrorPage";

const Cuenta = () => {
  const { session } = useContext(SupabaseContext);

  return (
    <Layout>
      {!session ? <ErrorPage /> : <GestionCuenta session={session} />}
    </Layout>
  );
};

export default Cuenta;
