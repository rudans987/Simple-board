import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getTodoList } from "../redux/modules/postSlice";
import Button from "../components/common/Button";
import Header from "../components/main/Header";
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
