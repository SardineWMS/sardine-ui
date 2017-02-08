'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let customerListData = {};
if (!global.customerListData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      'code|+1': 1,
      name: '@cname',
      state: '状态',
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  customerListData = data;
  global.customerListData = customerListData;
} else {
  customerListData = global.customerListData;
}

module.exports = {

  // 'POST /api/customer/query'(req, res) {
  //   console.dir(req);
  //   const page = qs.parse(req.body);
  //   const pageSize = page.pageSize || 10;
  //   const currentPage = page.page || 1;

  //   let data;
  //   let newPage;

  //   let newData = customerListData.data.concat();

  //   if (page.field) {
  //     const d = newData.filter(function (item) {
  //       return item[page.field].indexOf(page.keyword) > -1;
  //     });

  //     data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  //     newPage = {
  //       current: currentPage * 1,
  //       total: d.length
  //     };
  //   } else {
  //     data = customerListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  //     customerListData.page.current = currentPage * 1;
  //     newPage = {
  //       current: customerListData.page.current,
  //       total: customerListData.page.total
  //     };
  //   }

  //   res.json({
  //     success: true,
  //     data,
  //     page: newPage
  //   });
  //   // setTimeout(function () {

  //   // }, 500);
  // },




  'GET /api/customer/query':'http://192.168.1.102:8080/sardine-wms-web/basicinfo/customer/querybypage',
  'GET /api/customer/get':'http://192.168.1.102:8080/sardine-wms-web/basicinfo/customer/get',
};