import React from "react";
import Head from "next/head";
import { NextPage } from "next";

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>The page you were looking for doesnt exist 404 </title>
      </Head>
      <h1>Page not found ...</h1>
    </>
  );
};

export default Custom404Page;
