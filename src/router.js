import React from 'react';
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute
} from 'dva/router';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import Content from './routes/Content';
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

export default function ({
  history
}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="user" component={User} />
        <Route path="/home" component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/wms/basicInfo/category" component={Category} />
        <Route path="/wms/basicInfo/customer" component={Customer} />
        <Route path="/wms/basicInfo/container" component={Container} />
        <Route path="/wms/basicInfo/article" component={Article} />
        <Route path="/wms/basicInfo/supplier" component={Supplier} />
        <Route path="/wms/basicInfo/binType" component={BinType} />
        <Route path="/wms/basicInfo/containerType" component={ContainerType} />
        <Route path="/wms/basicInfo/bin" component={Bin} />
      </Route>
    </Router>
  );
}