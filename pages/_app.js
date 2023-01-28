import App from "next/app";
import '../styles/globals.css'
import useAutenticacion from "../hooks/useAutenticacion";
import UserContext from "../context/UserContext";
import jsCookie from "js-cookie";
import { ChakraProvider } from '@chakra-ui/react'

// import "react-table/react-table.css";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  let usuario = useAutenticacion();
  let token = jsCookie.get("token")

  return (
    <ChakraProvider>
      <UserContext.Provider
        value={{
          usuario,
          token
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>


  );
};

export default MyApp;