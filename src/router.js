import React from 'react';
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute
} from 'dva/router';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import EntityLog from './routes/log/EntityLog';
import Register from './routes/Register';
import Home from './routes/home/Home';
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
import DecInc from './routes/inner/DecInc';
import AlcNtcBill from './routes/forward/AlcNtcBill';
import AcceptanceBill from './routes/forward/AcceptanceBill';
import Carrier from './routes/tms/Carrier';
import Vehicle from './routes/tms/Vehicle';
import PickArea from './routes/basicinfo/PickArea';
import SerialArch from './routes/tms/SerialArch';
import Config from './routes/basicinfo/Config';
import WaveBill from './routes/forward/WaveBill';
import ReturnNtcBill from './routes/backward/ReturnNtcBill';
import ReturnBill from './routes/backward/ReturnBill';
import Report from './routes/report/Report';
import RtnSupplierNtcBill from './routes/backward/RtnSupplierNtcBill';
import ShipBill from './routes/tms/ShipBill';
import ReturnSupplierBill from './routes/backward/ReturnSupplierBill';

export default function ({
  history
}) {
  localStorage.removeItem("help_title");
  localStorage.removeItem("help_content");
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/inner/entitylog" component={EntityLog} />
        <Route path="/ia/user" component={User} />
        <Route path="/home" component={Home} />
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
        <Route path="/dc" component={System} />
        <Route path="/inner/task" component={Task} />
        <Route path="/inner/decIncBill" component={DecInc} />
        <Route path="/forward/alcNtcBill" component={AlcNtcBill} />
        <Route path="/tms/carrier" component={Carrier} />
        <Route path="/tms/vehicle" component={Vehicle} />
        <Route path="/basicInfo/pickArea" component={PickArea} />
        <Route path="/forward/acceptanceBill" component={AcceptanceBill} />
        <Route path="/tms/serialArch" component={SerialArch} />
        <Route path="/basicInfo/config" component={Config} />
        <Route path="/forward/waveBill" component={WaveBill} />
        <Route path="/backward/rtnNtcBill" component={ReturnNtcBill} />
        <Route path="/backward/storeRtnBill" component={ReturnBill} />
        <Route path="/report/*" component={Report} />
        <Route path="/backward/rtnsupplierntcbill" component={RtnSupplierNtcBill} />
        <Route path="/tms/shipBill" component={ShipBill} />
        <Route path="/backward/returnSupplierBill" component={ReturnSupplierBill} />
      </Route>
    </Router>
  );
}