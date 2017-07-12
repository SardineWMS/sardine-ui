import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message, Tabs } from 'antd';
import CompanyHome from '../../components/home/CompanyHome';
import WrhHome from '../../components/home/Home';

function Home({ location, dispatch, home }) {

  function refreshWidget() {
  	let companyUuid = localStorage.getItem("companyUuid");
  	if (companyUuid.indexOf("d") > 0) {
  		return (
               <div>
                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="消息管理" key="1">
                      <CompanyHome />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="流程概览" key="2">
                      <WrhHome />
                    </Tabs.TabPane>
                  </Tabs>
               </div>
  			);
  	}
    return (<div><CompanyHome /></div>);
  };
  
  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  );
};

export default Home;