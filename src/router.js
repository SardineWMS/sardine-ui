import React from 'react';
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute
} from 'dva/router';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Register from './routes/Register';
import App from './routes/app';
import Category from './routes/basicInfo/Category';
import User from './routes/User';
import Customer from './routes/basicInfo/Customer';
import Article from './routes/basicInfo/Article';
import Supplier from './routes/basicInfo/Supplier';
import Container from './routes/basicInfo/Container';
import BinType from './routes/basicInfo/BinType';
import ContainerType from './routes/basicInfo/ContainerType';
import Bin from './routes/basicInfo/Bin';
import Role from './routes/ia/Role';

export default function({
  history
}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/ia/user" component={User} />
        <Route path="/home" component={NotFound} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/basicInfo/category" component={Category} />
        <Route path="/basicInfo/customer" component={Customer} />
        <Route path="/basicInfo/container" component={Container} />
        <Route path="/basicInfo/article" component={Article} />
        <Route path="/basicInfo/supplier" component={Supplier} />
        <Route path="/basicInfo/binType" component={BinType} />
        <Route path="/basicInfo/containerType" component={ContainerType} />
        <Route path="/basicInfo/bin" component={Bin} />
        <Route path="/ia/role" component={Role} />
      </Route>
    </Router>
  );
}