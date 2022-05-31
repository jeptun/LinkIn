import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Edit from "./edit";
import Create from "./create";
import LinkList from "./linklist";
import Header from "./Header";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<LinkList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default Router;
