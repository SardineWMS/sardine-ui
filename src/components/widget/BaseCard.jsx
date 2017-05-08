import React from 'react';
import {Form,Button,Card,Row,Col} from 'antd';
import Guid from '../../utils/Guid';
const FormItem = Form.Item;

/** 基本卡片，带标题，可单列也可两列，暂不支持超过两列，两列时设置single={true}即可 **/
class BaseCard extends React.Component{

  render(){
    let single = this.props.single;
    return (
       <Card title={this.props.title} bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row gutter={36} >
                      {
                        React.Children.map(this.props.children, function (child) {
                          return (
                            <Col span={single ? 13 : 12} >
                                {child}
                            </Col>
                          );
                        })
                      }
                    </Row>
       </Card>
      );
  }
}


export default BaseCard;
