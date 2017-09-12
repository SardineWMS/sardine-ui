import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col ,Badge,message} from 'antd';
const EditableCell = require('../../widget/EditableCell');

function PickTaskSearchGrid({
  dataSource,
  pagination,
  onPageChange,
  onAbortBatch,
  onRpl,
  refresItemRealCaseQtyStr,
  selectedRowKeys = []
}) {

  function handlerExecuteParentTask() {
    console.log({selectedRowKeys});
  };

  function handlerExecuteChildTask(test) {
    console.log({test});
  };

  function handleMenuClick(e) {
    if (e.key == "1")
      onArticleMove();
    else
      onContainerMove();
  };

  function handlerAbortBatch() {
      onAbortBatch(selectedRowKeys);
  };

  function handlerPutAway() {
        console.log({selectedRowKeys});

     // onPutAway(selectedRowKeys);
  };

  function handlerRpl() {
      onRpl(selectedRowKeys);
  };

  function handlerPick() {
      onPick(selectedRowKeys);
  };

  const parentColumns = [{
        title: '单号',
        dataIndex: 'billNumber',
        key: 'billNumber',
        width: 120
      }, {
        title: '客户',
        dataIndex: 'customer',
        key: 'customer',
        width: 100,
        render: (text) => text?"[" + text.code + "]" + text.name :text
      }, {
        title: '配送方式',
        dataIndex: 'deliveryType',
        key: 'deliveryType',
        width: 50,
        render: (text) => "warehouse"===text?"仓库送":"自提"
      }, {
        title: '操作方式',
        dataIndex: 'method',
        key: 'method',
        width: 50,
        render: (text) => "ManualBill"===text?"手工单据":"APP"
      }, {
        title: '拣货类型',
        dataIndex: 'type',
        key: 'type',
        width: 50,
        render: (text) => "WholeContainer"===text?"整托":"非整托"
      },
      {
        title: '拣货区域',
        dataIndex: 'pickArea',
        key: 'pickArea',
        width: 50,
        render: (text) =>text? "[" + text.code + "]" + text.name :text
      },
      {
        title: '来源单据',
        dataIndex: 'sourceBill',
        key: 'sourceBill',
        width: 150,
        render: (text) =>text? "[" + text.billNumber + "]" + text.billType :text
      },
      {
        title: '拣货顺序',
        dataIndex: 'pickOrder',
        key: 'pickOrder',
        width: 100
      },
      {
        title: '总体积',
        dataIndex: 'volume',
        key: 'volume',
        width: 100
      }

    ];

  const expandedRowRender = (childDataSource,childIndex) => {
    function converState(text)  {
      if(text == "initial")
        return "未处理";
      if(text=="inProgress")
        return "进行中";
      if(text=="finished")
        return "已完成";
      if(text=="exception")
        return "异常";
      if(text=="skip")
        return "跳过";
      if(text=="stockOut")
        return "缺货";
    };

    const childColumns = [{
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => converState(text),
      width: 80
    },{
      title: '商品代码',
      dataIndex: 'article',
      key: 'article',
      render: (text) => text.code,
      width: 100
    }, {
      title: '名称及规格',
      dataIndex: 'articleSpec',
      key: 'articleSpec',
      render: (text, record) => record.article.name + "," + record.articleSpec,
      width: 150
    },{
      title: '包装',
      dataIndex: 'qpcStr',
      key: 'qpcStr',
      render: (text, record) => record.munit + "," + record.qpcStr,
      width: 100
    },{
      title: '数量',
      dataIndex: 'qty',
      key: 'qty',
      width: 70
    },{
      title: '来源货位',
      dataIndex: 'sourceBinCode',
      key: 'sourceBinCode',
      width: 100
    },{
      title: '来源容器',
      dataIndex: 'sourceContainerBarcode',
      key: 'sourceContainerBarcode',
      width: 100
    }, {
      title: '目标货位',
      dataIndex: 'toBinCode',
      key: 'toBinCode',
      width: 100
    },{
      title: '目标容器',
      dataIndex: 'toContainerBarcode',
      key: 'toContainerBarcode',
      width: 100
    },{
      title: '件数',
      dataIndex: 'caseQtyStr',
      key: 'caseQtyStr',
      width: 100
    },{
      title: '实际数量',
      dataIndex: 'realQty',
      key: 'realQty',
      width: 120,
      render: (text, record, index) => renderColumns(record,"realQty", text,index)
    }, {
      title: '实际件数',
      dataIndex: 'realCaseQtyStr',
      key: 'realCaseQtyStr',
      width: 100
    }, {
      title: '拣货员',
      dataIndex: 'picker',
      key: 'picker',
      width: 100
    }];

    function renderColumns(record, key, text,index) {
    // if(key==="toBinCode")
    //   return text;
    return (<EditableCell
      editable= {false}
      value={text}
      status={status}
      onChange={value => handleChange(record,key,value,index)}
      />);
    };

    function handleChange(record,key,value,itemIndex){
      var reg = /^\d+(\.{0,1}\d+){0,1}$/;
      if(!reg.test(value)){
        message.error("请输入大于0的数字", 2, '');
        return;
      }
      if(value> record.qty){
        message.error("实际数量不能大于计划数量", 2, '');
        return;
      }
      record.realQty=value;
      childDataSource[itemIndex]=record;
      dataSource[childIndex].items=childDataSource;
      refresItemRealCaseQtyStr(itemIndex,childIndex,record.realQty,record.qpcStr);
    };

    return (
      <Table
        columns={childColumns}
        dataSource={childDataSource}
        rowSelection={rowSelection}
        pagination={false}
      />
    );
  };

  const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
          selectedRowKeys = selectedRows;
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
          selectedRowKeys = selectedRows;
      },
      getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',
      })
  };

  return (
    <div>
      <Table size="small"
        bordered
        columns={parentColumns}
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.uuid}
        rowSelection={rowSelection}
        expandedRowRender={(record,index) => expandedRowRender(record.items,index)}
        title={() =>
          <div>
            <Button onClick={handlerAbortBatch}>批量作废</Button>
          </div>}
      />
    </div>
  );
};

PickTaskSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onArticleMove: PropTypes.func,
  onContainerMove: PropTypes.func
};

export default PickTaskSearchGrid;

