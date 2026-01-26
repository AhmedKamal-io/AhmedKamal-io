import React from "react";
import { FaCopyright, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" flex flex-nowrap flex-col justify-center items-center w-full pb-14 lg:pb-2.5 bg-Blacky">
      <div className="border-b-1 border-Whitey flex flex-col sm:flex-row   justify-between items-start p-4 border-t-1 w-full">
        <div className="text-sm text-Whitey  flex flex-col w-1/2 my-2">
          <a href="#home" className="hover:text-Secound m-2 ">
            Home
          </a>
          <a href="#about" className="hover:text-Secound m-2">
            About me
          </a>
          <a href="#services" className="hover:text-Secound m-2">
            Services
          </a>
          <a href="#tech" className="hover:text-Secound m-2">
            Tecnologies
          </a>
        </div>
        <div className="text-sm text-Whitey  flex flex-col w-1/2 my-2">
          <a href="#projects" className="hover:text-Secound m-2">
            Projects
          </a>
          <a href="#blog" className="hover:text-Secound m-2">
            Blog
          </a>
          <a href="#contact" className="hover:text-Secound m-2">
            Contuct Us
          </a>
        </div>
        <div className="flex  w-1/2 flex-row  items-center text-2xl p-5 my-2 ">
          <a
            href="https://www.instagram.com/a7med_kamal_ak"
            target="_blank"
            aria-label="Visit my instagram profile"
            className="mx-3 sm:mx-2"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/ahmed.kamsl.5"
            target="_blank"
            aria-label="Visit my facebook profile"
            className="mx-3 sm:mx-2"
          >
            <FaFacebook />
          </a>
          {/* <a
            href="https://github.com/AhmedKamal-io"
            target="_blank"
            aria-label="Visit my github profile"
            className="mx-3 sm:mx-2"
          >
            <FaGithub />
          </a> */}

          <a
            href="https://github.com/AhmedKamal-io"
            target="_blank"
            aria-label="Visit my Youtube Channel"
            className="mx-3 sm:mx-2"
          >
            <FaYoutube />
          </a>

          <a
            href="https://x.com/AhmedKamal_io"
            className="mx-3 sm:mx-2"
            target="_blank"
            aria-label="Visit my X Twitter profile"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-kamal-63496837a/"
            className="mx-3 sm:mx-2"
            target="_blank"
            aria-label="Visit my Linkedin profile"
          >
            <FaLinkedin />
          </a>
        </div>
        <div className="flex flex-nowrap w-1/2 my-2">
          <h2 className="text-sm ml-[30%]">
            Powerd by :{" "}
            <a href="" className="GluePrime">
              Ahmed Kamal
            </a>
          </h2>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap justify-center items-center gap-3.5">
        <div className="flex justify-center items-center gap-2 py-3.5 text-md text-Whitey">
          <FaCopyright className="text-lg" />
          <p className="tracking-wide">
            {new Date().getFullYear()} — All rights reserved
          </p>
        </div>

        <div className="text-md bg-AssendFade rounded-full px-2">
          Version 1.5.4
        </div>
      </div>
    </footer>
  );
};

export default Footer;
