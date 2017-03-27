import React from 'react';
import {Form,Button,Card,Row,Col} from 'antd';


const FormItem = Form.Item;

class BaseCard extends React.Component{

  render(){
    let count=React.Children.count(this.props.children);
    return (
       <Card title={this.props.title} bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row gutter={36} >
                      {
                        React.Children.map(this.props.children, function (child) {
                          return (
                            <Col span={count===2? 12:36}>
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
