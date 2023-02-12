import { Route, Redirect, Switch } from "react-router-dom";

import routes from "routes";
import { ProtectedRoute } from "./ProtectedRoute";

export default function App() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.path) {
        if (route.protected) {
          return <ProtectedRoute exact path={route.path} component={route.component} key={route.key} />;
        }
        return <Route exact path={route.path} component={route.component} key={route.key} />;
      }
      return null;
    });

  return (
      <Switch>
        {getRoutes(routes)}
        <Redirect to="/" />
      </Switch>
  );
}
