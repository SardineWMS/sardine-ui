import React, { Component, PropTypes } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import styles from '../../../less/dynamicButton.less'
const FormItem = Form.Item;

const ReasonConfigForm = ({
  title,
	reasons,
	onAdd,
	onRemove,
	setReasonConfig,
	form: {
	    setFieldsValue,
	    getFieldDecorator,
	    getFieldsValue,
      validateFields,
      getFieldValue
    	},
	}) => {

   	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
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

    function handleSubmit(e){
	    e.preventDefault();
	    validateFields((err,values) => {
	      if (err) {
	        return;
	      }

        const newReasons=[];
        for(var key in values){
          newReasons.push(values[key]);
        }
       setReasonConfig(newReasons);
	    });
    }

    function handleRemove(index){
      const values={...getFieldsValue()};
        const newReasons=[];
        for(var key in values){
          newReasons.push(values[key]);
        }
      onRemove(index,newReasons);
    }


    const formItems = reasons.map((reason, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? title : ''}
          required={false}
          key={index}
        >
          {getFieldDecorator(`${index}`, {
            initialValue: reason,
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入。",
            }],
          })(
            <Input placeholder="请输入" style={{ width: '60%', marginRight: 8 }}/>
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={reasons.length === 1}
            onClick={() => handleRemove(index)}
          />
        </FormItem>
      );
    });

    return (
      <Form onSubmit={handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={() => onAdd(reasons)} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );

};

export default Form.create()(ReasonConfigForm);
