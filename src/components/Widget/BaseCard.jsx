import React from 'react';
import {Form,Button,Card,Row,Col} from 'antd';
import Guid from '../../utils/Guid';
const FormItem = Form.Item;


class BaseCard extends React.Component{

  render(){
    let single = this.props.single;
    return (
       <Card title={this.props.title} bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row gutter={36} >
                      {
                        React.Children.map(this.props.children, function (child) {
                          return (
                            <Col span={single ? 13 : 12} key={Guid()}>
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
