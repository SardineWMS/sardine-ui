import React, { Component, PropTypes } from 'react';
/**
 * 打印预览
 * 通过重定向URL并打开新窗口实现待打印数据的预览
 *
 **/
export function printPreview(reportletName, params) {
	localStorage.setItem('report-url', 'http://localhost:8080/sardine-wms-report');
    var companyUuid = localStorage.getItem("companyUuid");
    var url = localStorage.getItem("report-url") + "/ReportServer?reportlet=" + reportletName + "&companyUuid=" + companyUuid;
    if (params) {
       params.forEach(function (value, key, map) {
         url = url + "&" + key + "=" + value;
       });
    }
    window.open(url, "_blank");
};

export function print(reportletName, params) {
	localStorage.setItem('report-url', 'http://localhost:8080/sardine-wms-report');
    var companyUuid = localStorage.getItem("companyUuid");
    var url = localStorage.getItem("report-url") + "/ReportServer?reportlet=" + reportletName + "&companyUuid=" + companyUuid;
    if (params) {
       params.forEach(function (value, key, map) {
         url = url + "&" + key + "=" + value;
       });
    }
    FR.doURLFlashPrint("http://127.0.0.1:8080/sardine-wms-report/ReportServer?reportlet=%E6%B5%8B%E8%AF%95.cpt&companyUuid=xxxx0002&token=null&code=xxx&name=xxx", false);
}