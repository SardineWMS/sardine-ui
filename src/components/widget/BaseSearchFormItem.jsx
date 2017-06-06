import React from 'react';
import {Form} from 'antd';
import styles from '../less/common.less';
import BaseTwoCol from './BaseTwoCol';


const FormItem = Form.Item;
const baseFormItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
};
const baseClassName=styles.normalInput;

class BaseSearchFormItem extends React.Component{
  render(){
    return (
       <BaseTwoCol key={this.props.key}>
          <FormItem label={this.props.label} {...baseFormItemLayout} key={this.props.key} className={baseClassName}>
             {this.props.children}
          </FormItem>
       </BaseTwoCol>
      );
  }
}

export default BaseSearchFormItem;
