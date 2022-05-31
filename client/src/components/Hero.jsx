import React from "react";

// We import NavLink to utilize the react router.
import { Link } from "react-router-dom";
import Imgs from "../assets/quote-intro.svg";

// Here, we display our Navbar
const Hero = () => {
  return (
    <div className="m-auto max-w-7xl p-12 bg-white dark:bg-magicBlack-100 text-black dark:text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 max-w-md flex flex-col justify-center">
          <h1 className="md:text-5xl text-2xl uppercase font-black">
            Responsive hh left-aligned hero with image
          </h1>
          <p className="text-xl mt-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="my-5">
            <Link
              className="shadow-md font-medium py-2 px-4 
               cursor-pointer bg-royalblue hover:bg-indigo-600 rounded text-lg text-center w-48 text-yellow-400 hover:text-yellow-100"
              to="/create"
            >
              Create Links
            </Link>
          </div>
        </div>
        <div className="flex md:justify-end w-full md:w-1/2 -mt-5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-tl-lg">
            <div className="shadow-2xl max-w-md z-10 rounded-full mt-4 ml-3 ">
              <img
                alt="card img"
                className="rounded-t"
                src="https://images.unsplash.com/photo-1653874459850-1d6891a73d4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              />
              <div className="text-2xl p-10 bg-white dark:bg-magicBlack-500">
                <img alt="quote" className="float-left mr-1" src={Imgs} /> Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
