'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

let tableListData = {};
if (!global.tableListData) {
  const data = mockjs.mock({
    'data|1000': [{
      'id|1-9999': 1,
      'categoryCode|11-999': 1,
      categoryName: '@name',
      remark: '说明',
      children: [{
        'id|1-9999': 1,
        'categoryCode|11-999': 1,
        categoryName: '@name',
        remark: 'DF01',
      }, {
        'id|1-9999': 1,
        'categoryCode|11-999': 1,
        categoryName: '@name',
        remark: 'DF01',
      }]
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

module.exports = {

  'POST /api/category/query' (req, res) {
    console.log('categoryQuery');
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = tableListData.data.concat();

    if (page.field) {
      const d = newData.filter(function(item) {
        return item[page.field].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length
      };
    } else {
      data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      tableListData.page.current = currentPage * 1;
      newPage = {
        current: tableListData.page.current,
        total: tableListData.page.total
      };
    }

    setTimeout(function() {
      res.json({
        success: true,
        data
      });
    }, 500);
  },

  'POST /api/category/create' (req, res) {
    res.json({
      success: true,
    });
  },

  'POST /api/category/update' (req, res) {
    res.json({
      success: true,
    });
  },

  'DELETE /api/users' (req, res) {
    res.json({
      success: true,
    });
  }

};