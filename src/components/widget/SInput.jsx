import React from 'react';
import { Form, Input } from 'antd';
import styles from '../less/common.less';

const FormItem = Form.Item;
const baseFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
};
const baseClassName = styles.normalInput;

/**
自定义文本输入框，展示效果由外部调用者传入
1，label值
2，key，即fieldName
3，rules：校验规则
4，value：控件值
5，placeholder：空白展示值
6，suffix：后缀，用于弹出框等控件
7，onBlur：输入框的失去焦点事件
8，onPressEnter：输入框的回车和tab键事件
9，getFieldDecorator：注册form组件
*/

class SInput extends Input {
  renderInput() {
  	let fieldName = this.props.fieldName;
  	let rules = this.props.rules ? eval(this.props.rules) : null;
  	let value = this.props.value;
  	let getFieldDecorator = this.props.getFieldDecorator;
  	let className = baseClassName;
  	if (this.props.isTop) {
  		className = styles.topInput;
  	}

  	if (this.props.isBottom) {
  		className = styles.bottomInput;
  	}
    return (
      <FormItem label={this.props.label} {...baseFormItemLayout} className={className} key={fieldName}>
        {this.props.getFieldDecorator(fieldName, {
                     rules: rules,
                     initialValue: value
         })(
      <Input placeholder={this.props.placeholder} suffix={this.props.suffix} addonAfter={this.props.addonAfter}
        onBlur={this.props.onBlur} onPressEnter={this.props.onPressEnter} />
      )}
      </FormItem>
    );
  }

  render() {
  	return this.renderInput();
  };
};

export default SInput;
