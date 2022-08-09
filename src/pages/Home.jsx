import React from "react";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import List from "../components/main/List";

function Home() {
  return (
    <>
      <Layout>
        <Header />
        <List />
      </Layout>
    </>
  );
}

export default Home;
