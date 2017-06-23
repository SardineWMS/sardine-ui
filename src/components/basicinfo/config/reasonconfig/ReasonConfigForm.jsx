import { Form, Input, Icon, Button } from 'antd';
import React from 'react';
import Guid from '../../../../utils/Guid';
const FormItem = Form.Item;

let uuid = 0;
class ReasonConfigForm extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat('');
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newReasons=[];
        for(var key in values){
          if (key != 'keys')
            newReasons.push(values[key]);
        }
       this.props.setReasonConfig(newReasons);
      }
    });
  }

  changeHandler = (index) => {
    console.log(index);
    const keys = this.props.form.getFieldValue('keys');
    keys[`${index}`] = this.props.form.getFieldValue(`names-${index}`);
    this.props.form.setFieldsValue({
      keys: keys,
    });
    console.dir(keys);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: this.props.reasons });

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? this.props.title : ''}
          required={false}
          key={index}
          style={{'padding-top': '3px',
                  'margin-bottom': '3px'}}
        >
          {getFieldDecorator(`names-${index}`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: k,
            rules: [{
              required: true,
              whitespace: true,
              message: "原因不能为空或者删除该行！",
            }],
          })(
            <Input placeholder="请输入原因" style={{ width: '60%', marginRight: 8 }} onBlur={() => this.changeHandler(index)}/>
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel} style={{'padding-top': '3px',
                  'margin-bottom': '3px'}}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 新增
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ReasonConfigForm);

