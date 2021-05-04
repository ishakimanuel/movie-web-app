import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import NotFoundComponent from './not-found';

const Router = ({ routes }) => {
  const { pathname } = useLocation();
  const { url } = useRouteMatch();

  const renderRoutes = () =>
    routes.map((route) => {
      const routeUrl = url === '/' ? `${route.path}` : `${url}${route.path}`;
      const exact = route.exact ?? true;
      return <Route {...route} key={pathname} path={routeUrl} exact={exact} />;
    });

  return (
    <Switch>
      {renderRoutes()}
      <Route component={NotFoundComponent} />
    </Switch>
  );
};

export default Router;
