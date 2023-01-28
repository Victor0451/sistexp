import React from "react";
import Navbar from "../NavBar/Navbar";
import Head from 'next/head'
import jsCookie from "js-cookie";
import {
    Box,
    useColorModeValue
} from "@chakra-ui/react";



const Layout = (props) => {


    let token = jsCookie.get("token")


    return (
        <div className="">
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossOrigin="anonymous"></link>


                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.css"
                />

                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                    crossOrigin="anonymous"
                ></link>


                <title>SISTEMA DE EXPEDIENTES</title>
            </Head>



            <Box
                p={4}
                bg={useColorModeValue('gray.50', 'gray.800')}
                color={useColorModeValue('black', 'white')}
            >

                <Navbar

                />

                <main >{props.children}</main>
            </Box>


            <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js" integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossOrigin="anonymous"></script>

        </div>
    );
};
export default Layout;