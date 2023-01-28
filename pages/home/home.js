import React from 'react'
import UserContext from "../../context/UserContext";
import Layout from '../../components/Layouts/Layout';
import HomeScreen from '../../components/home/HomeScreen';

const Home = () => {

  return (
    <Layout>
      <HomeScreen listado={[]} />
    </Layout>
  );

}

export default Home