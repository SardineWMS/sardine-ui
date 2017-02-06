'use strict';

const qs=require('qs');
const mockjs=require('mockjs');//引入mockjs

let tableListData={};
if(!global.tableListDate){
const data=mockjs.mock({
      'data|100':[{
       'id|+1':1,
        'code|1000-9000':1,
        name:'@name',
      }],
      page:{
        total:100,
        current:1
      }
    });
    tableListData=data;
    global.tableListData=tableListData;
}else{
  tableListData=global.tableListData;
}

module.exports={

  'GET /supplier/query' (req, res) {
      console.log('YYY');
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = tableListData.data.concat();

    if (page.field) {
      const d = newData.filter(function (item) {
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
        data,
        page: newPage
      });
    }, 500);
  }

};