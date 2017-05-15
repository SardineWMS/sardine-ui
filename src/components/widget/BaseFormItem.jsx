import React from 'react';
import {Form} from 'antd';
import styles from '../less/common.less';


const FormItem = Form.Item;
const baseFormItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
};
const baseClassName=styles.normalInput;

class BaseFormItem extends React.Component{
  render(){
    return (
       <FormItem label={this.props.label} {...baseFormItemLayout}	className={baseClassName}>
         {this.props.children}
       </FormItem>
      );
  }
}

export default BaseFormItem;
