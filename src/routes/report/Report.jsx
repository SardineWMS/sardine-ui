import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message, Tabs } from 'antd';

function Report({ location, dispatch, report }) {

  function refreshWidget() {
    localStorage.setItem('report-url', 'http://localhost:8080/sardine-wms-report');
      var pathName = location.pathname;
      var reportlets = pathName.substring("/report/".length, pathName.length);
      var reportletsName = reportlets + ".cpt";
      var src = "/report/ReportServer?reportlet=" + reportletsName;
      var token = localStorage.getItem("token");
      var ss = localStorage.getItem("report-url") + "/ReportServer?reportlet=%E6%B5%8B%E8%AF%95.cpt&op=form&token=" + token;
  		return (
               <iframe id="reportFrame" width="100%" height="500" src={ss}></iframe> 
  			);
  };
  
  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  );
};

export default Report;