import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import { timeStamp2datetime } from '../../utils/DateUtils';

function EntityLogGrid({
  dataSource,
  onPageChange,
  pagination
}) {

  const columns = [{
      title: '操作人',
      dataIndex: 'operateInfo'
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      render: text => timeStamp2datetime(text)
    }, {
      title: '事件',
      dataIndex: 'event'
    }, {
      title: '描述',
      dataIndex: 'message'
    }];

    function onBack() {
      console.log(window.history.toString());
      window.history.go(-1); 
    };

  return (
    <div>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.uuid}
        title={() =>
          <div>
            <Row type="flex">
              <Col><Button type="primary" onClick={onBack} >返回</Button></Col>
            </Row>
          </div>}
       />
    </div>
  );
};

EntityLogGrid.propTypes = {

};

export default EntityLogGrid;