import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';

function ArticleSearch({
	dataSource,
  onCreate,
  onEdit,
  onView,
  onSetFixedPickBinBatch,
  onSetFixedPickBinItem,
  pagination,
  onPageChange,
  selectedRowKeys = [],
  onOnline,
  onOffline
}) {

  function handleCreate(e) {
    e.preventDefault();
    onCreate();
  };

  function handleOnline(e) {
    e.preventDefault();
    onOnline(selectedRowKeys);
  };

  function handleOffline(e) {
    e.preventDefault();
    onOffline(selectedRowKeys);
  }

  function handleSetFixedPickBinBatch() {
    onSetFixedPickBinBatch(selectedRowKeys);
  };

  const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => <a onClick={() => onView(record)} disabled={!PermissionUtil("article:view")}>{text}</a>,
    sorter: true
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  }, {
    title: '简称',
    dataIndex: 'simpleName',
    key: 'simpleName',
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => (text == "online" ? '正常' : '停用')
  }, {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec'
  }, {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
    render: (text, record) => (text ? (<a href="/#/basicInfo/category"> {"[" + record.category.code + "]" + record.category.name} </a>) : "")
  }, {
    title: '保质期',
    dataIndex: 'expDays',
    key: 'expDays'
  }, {
    title: '第二代码',
    dataIndex: 'secondCode',
    key: 'secondCode'
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  }, {
    title: '进价',
    dataIndex: 'purchasePrice',
    key: 'purchasePrice'
  }, {
    title: '售价',
    dataIndex: 'sellPrice',
    key: 'sellPrice'
  }, ];

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
      // disabled: record.name === 'Disabled User',
    })
  };

  return (
    <div>
      <Table size="small"
        bordered
        columns={columns}
        rowSelection={rowSelection}
        title={() =>
          <div>
            <Button onClick={handleCreate} disabled={!PermissionUtil("article:create")}>新建</Button>
            <Button onClick={handleOffline} disabled={!PermissionUtil("article:edit")}>停用</Button>
            <Button onClick={handleOnline} disabled={!PermissionUtil("article:edit")}>启用</Button>
          </div>
        }
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.uuid}
      />
    </div>
  );
};

ArticleSearch.propTypes = {
  dataSource: PropTypes.array,
  onCreate: PropTypes.func,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func
};

export default ArticleSearch;

