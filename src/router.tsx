import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import CharacterLandingPage from "./pages/CharacterLandingPage";
import CharacterDetailsComponent from "./components/CharacterDetailsComponent";
import EpisodeDetailComponent from "./components/EpisodeDetailComponent";
import LocationDetailComponent from "./components/LocationDetailComponent";

const Router = () => (
  <Switch>
    <Redirect from="/" exact to="/all-characters" />
    <Route path="/all-characters" component={CharacterLandingPage} />
    <Route path="/character/:id" component={CharacterDetailsComponent} />
    <Route path="/episode/:id" component={EpisodeDetailComponent} />
    <Route path="/location/:id" component={LocationDetailComponent} />
  </Switch>
);

export default Router;
