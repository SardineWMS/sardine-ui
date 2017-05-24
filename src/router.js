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
import Category from './routes/basicinfo/Category';
import User from './routes/ia/User';
import Customer from './routes/basicinfo/Customer';
import Article from './routes/basicinfo/Article';
import Supplier from './routes/basicinfo/Supplier';
import Container from './routes/basicinfo/Container';
import BinType from './routes/basicinfo/BinType';
import ContainerType from './routes/basicinfo/ContainerType';
import Bin from './routes/basicinfo/Bin';
import Role from './routes/ia/Role';
import System from './routes/system/System';
import OrderBill from './routes/forward/OrderBill';
import Receive from './routes/forward/Receive';
import Task from './routes/inner/Task';


export default function ({
  history
}) {
  localStorage.removeItem("help_title");
  localStorage.removeItem("help_content");
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
        <Route path="/forward/order" component={OrderBill} />
        <Route path="/forward/receiveBill" component={Receive} />
        <Route path="/system/dc" component={System} />
        <Route path="/inner/task" component={Task} />
      </Route>
    </Router>
  );
}