import React from "react";
import { Route, useLocation } from "react-router-dom";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Home from "../../pages/Home/Home";
import Form from "../../pages/Form/Form";
import Detail from "../../pages/Detail/Detail";
import NavBar from "../NavBar/NavBar";

const Router = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" ? <LandingPage /> : <NavBar />}
      <Route path="/home" render={() => <Home />} />
      <Route path="/create" render={() => <Form />} />
      <Route path="/detail/:id" render={() => <Detail />} />
    </div>
  );
};

export default Router;
