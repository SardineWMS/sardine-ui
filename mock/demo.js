'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let demoListData = {};
if (!global.demoListData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      name: '@cname',
      'age|11-99': 1,
      address: '@region'
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  demoListData = data;
  global.demoListData = demoListData;
} else {
  demoListData = global.demoListData;
}

module.exports = {

  'GET /api/users' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = demoListData.data.concat();

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
      data = demoListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      demoListData.page.current = currentPage * 1;
      newPage = {
        current: demoListData.page.current,
        total: demoListData.page.total
      };
    }


    setTimeout(function() {
      res.json({
        success: true,
        data,
        page: newPage
      });
    }, 500);
  },

  'POST /api/register' (req, res) {

    console.log('注册……');
    const newData = qs.parse(req.body);

    console.dir(newData);
  },

  'POST /api/users' (req, res) {
    setTimeout(function() {
      const newData = qs.parse(req.body);

      newData.id = demoListData.data.length + 1;
      demoListData.data.unshift(newData);

      demoListData.page.total = demoListData.data.length;
      demoListData.page.current = 1;

      global.demoListData = demoListData;
      res.json({
        success: true,
        data: demoListData.data,
        page: demoListData.page
      });
    }, 500);
  },

  'DELETE /api/users' (req, res) {
    setTimeout(function() {
      const deleteItem = qs.parse(req.body);

      demoListData.data = demoListData.data.filter(function(item) {
        if (item.id == deleteItem.id) {
          return false;
        }
        return true;
      });

      demoListData.page.total = demoListData.data.length;

      global.demoListData = demoListData;
      res.json({
        success: true,
        data: demoListData.data,
        page: demoListData.page
      });
    }, 500);
  },

  'PUT /api/users' (req, res) {
    setTimeout(function() {
      const editItem = qs.parse(req.body);

      demoListData.data = demoListData.data.map(function(item) {
        if (item.id == editItem.id) {
          return editItem;
        }
        return item;
      });

      global.demoListData = demoListData;
      res.json({
        success: true,
        data: demoListData.data,
        page: demoListData.page
      });
    }, 500);
  }

};