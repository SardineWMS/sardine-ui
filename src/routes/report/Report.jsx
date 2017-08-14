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
      var companyUuid = localStorage.getItem("companyUuid");
      var userUuid = localStorage.getItem("loginId");
      var src = localStorage.getItem("report-url") + "/ReportServer?reportlet=%E6%B5%8B%E8%AF%95.cpt&companyUuid=" + companyUuid + 
      "&userUuid=" + userUuid;
  		return (
               <iframe id="reportFrame" width="100%" height="500" src={src}></iframe> 
  			);
  };
  
  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  );
};

export default Report;