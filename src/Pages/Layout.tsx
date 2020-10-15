import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "../routes";
import Search from "../components/Search";

export default () => {
  return (
    <>
      <Search />
      <Switch>
        {routes.map((router) => {
          return (
            <Route
              key={router.name}
              exact={router.exact}
              path={router.path}
              component={router.component}
            />
          );
        })}
      </Switch>
    </>
  );
};
