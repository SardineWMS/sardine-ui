/**
 * 打印预览
 * 通过重定向URL并打开新窗口实现待打印数据的预览
 *
 **/
export function printPreview(reportletName, params) {
	localStorage.setItem('report-url', 'http://localhost:8080/sardine-wms-report');
    var token = localStorage.getItem("token");
    var url = localStorage.getItem("report-url") + "/ReportServer?reportlet=" + reportletName + "&token=" + token;
    if (params) {
       params.forEach(function (value, key, map) {
         url = url + "&" + key + "=" + value;
       });
    }
    window.open(url, "_blank");
};

export function print(reportletName, params) {
	localStorage.setItem('report-url', 'http://localhost:8080/sardine-wms-report');
    var token = localStorage.getItem("token");
    var url = localStorage.getItem("report-url") + "/ReportServer?reportlet=" + reportletName + "&token=" + token;
    if (params) {
       params.forEach(function (value, key, map) {
         url = url + "&" + key + "=" + value;
       });
    }
    <script language="javascript">
       document.write("<script src='test.js'></script>");
    </script>
    FR.doURLFlashPrint(url, false);
}