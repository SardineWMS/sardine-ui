import styles from '../../less/EditTable.less';
import React, { Component, PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';
import PermissionUtil from '../../../utils/PermissionUtil';
const confirm = Modal.confirm;

const EditableCell = require('../../Widget/EditableCell');

const ArticleEditableSupplier = ({
  dataSource,
  articleUuid,
  count,
  onSaveSupplier,
  onAdd,
  onDelete,
  onSetDefaultSupplier
}) => {
  function onCellChange(index) {
    return (value) => {
      if (dataSource[index]["supplierCode"] == value)
        return;
      onSaveSupplier(articleUuid, dataSource[index]["uuid"], value);
    }
  }

  const columns = [{
    title: '供应商代码',
    dataIndex: 'supplierCode',
    width: '30%',
    render: (text, record, index) => {
      return (
        <EditableCell
          value={text}
          onChange={onCellChange(index)}
          editable={record.supplierUuid ? false : true}
        />
      )
    },
  }, {
    title: '供应商名称',
    dataIndex: 'supplierName',
  }, {
    title: '默认供应商',
    dataIndex: 'default_',
    render: text => (text ? "是" : "否"),
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
      return (

        <p>
          <Popconfirm title={"确定要删除" + record.supplierCode + "吗？"} onConfirm={() => onDelete(articleUuid, record.uuid)}>
            <a href="#" disabled={PermissionUtil("article:edit")}>{record.uuid ? "删除" : ""}</a>
          </Popconfirm>
          &nbsp;
            <Popconfirm title={"确定要设置" + record.supplierCode + "为默认供应商吗？"} onConfirm={() => onSetDefaultSupplier(articleUuid, record.uuid)}>
            <a href="#" disabled={PermissionUtil("article:edit")}>{(record.supplierUuid && !record.default_) ? "设为默认" : ""}</a>
          </Popconfirm>
        </p>
      );
    },
  }];

  return (<div>
    <div className={commonStyles.button}>
      <Button type="ghost" onClick={() => onAdd(articleUuid)} disabled={PermissionUtil("article:edit")}>增加</Button>
    </div>
    <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} />
  </div>);
};

ArticleEditableSupplier.propTypes = {
  dataSource: PropTypes.array,
  articleUuid: PropTypes.string,
  count: PropTypes.number,
  onSaveSupplier: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onSetDefaultSupplier: PropTypes.func
};

export default ArticleEditableSupplier;