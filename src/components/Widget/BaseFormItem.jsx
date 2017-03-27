import React from 'react';
import {Form} from 'antd';
import styles from '../Layout/common.less';


const FormItem = Form.Item;
const baseFormItemLayout = {
        labelCol: { span: 9}
};
const baseClassName=styles.formItem;

class BaseFormItem extends React.Component{
  render(){
    return (
       <FormItem label={this.props.label} {...this.props.formItemLayout? this.props.formItemLayout:baseFormItemLayout} 
       	className={this.props.className?this.props.className:baseClassName}>
         {this.props.children}
       </FormItem>
      );
  }
}


export default BaseFormItem;
