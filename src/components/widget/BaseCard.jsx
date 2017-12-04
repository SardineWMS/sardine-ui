import React from 'react';
import { Form, Button, Card, Row, Col } from 'antd';
import Guid from '../../utils/Guid';
const FormItem = Form.Item;
import Panel from './Panel';


/** 基本卡片，带标题，可单列也可两列，暂不支持超过两列，两列时设置single={true}即可 **/
class BaseCard extends React.Component {

  render() {
    let single = this.props.single;
    return (   
      <Panel title={this.props.title} bodyStyle={{ padding: 0 }}>
        <Row gutter={36} >
          {
            React.Children.map(this.props.children, function (child) {
              return (
                <Col span={single ? 36 : 12} >
                  {child}
                </Col>
              );
            })
          }
        </Row>
      </Panel>
    );
  };
};


export default BaseCard;
