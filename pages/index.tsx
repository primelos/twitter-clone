import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;
