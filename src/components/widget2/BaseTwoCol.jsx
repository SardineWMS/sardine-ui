import React from 'react';
import {Col} from 'antd';

class BaseTwoCol extends React.Component{
  render(){
    return (
       <Col span={12} key={this.props.key}>
         {this.props.children}
       </Col>
      );
  }
}

export default BaseTwoCol;
