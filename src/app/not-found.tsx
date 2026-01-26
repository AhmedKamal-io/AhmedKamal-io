import Link from "next/link";
import React from "react";
import { FaHome, FaWifi } from "react-icons/fa";

const notfound = () => {
  return (
    <div className="relative bg-Blacky flex flex-col justify-center items-center h-[100vb]">
      <h1 className="text-[140px] text-Whitey border-b-1 border-Whitey absolute bottom-[62%]  ">
        404
      </h1>
      <div className="w-[92%] rounded-2xl backdrop-blur-sm bg-AssendFade flex flex-col justify-center items-center p-5 border-1 border-Whitey">
        <h2 className="text-xl border-b-2 border-Secound leading-10">
          <span className="text-2xl text-Secound   px-2 py-1">Oops!</span> Page
          not found
        </h2>
        <p className="py-6 leading-10 w-fit gap-2 ">
          Check out the internet conection{" "}
          <span>
            <FaWifi />
          </span>
          or go to{" "}
          <Link
            href="/"
            className="text-xl bg-Secound rounded-2xl px-2 py-1 flex flex-nowrap w-fit gap-2"
          >
            <FaHome /> Home Page
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default notfound;
