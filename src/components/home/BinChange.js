import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  Card,
  Popover
} from 'antd';

const BinChange = ({
  loading
}) => {
  return (
    <div style={{'padding-top': '5px', 'padding-left': '5px', width: '99%'}}>
    <Card title={<b>货位变化</b>} bordered={true} noHovering={true} >
    <div style={{'border': '1px solid #3300CC'}}>
  <img src="http://172.17.1.53:8888/logo/binchange.png"/>
</div>
</Card>
</div>
  );
};

BinChange.propTypes = {
};

export default BinChange;