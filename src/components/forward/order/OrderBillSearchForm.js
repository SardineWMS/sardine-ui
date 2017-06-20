import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';

const Option = Select.Option;

const OrderBillSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
})=>{

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    };

    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    };
    
    const children = [];
    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"单号 类似于"} >
                {getFieldDecorator("billNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    children.push(
        <BaseTwoCol key='state'>
            <BaseFormItem label="状态 类似于">
              {getFieldDecorator('state',{
                initialValue:"all"
              })(
                <Select showSearch={false} size="default" 
                >
                    <Option value="all">全部</Option>
                    <Option value="Initial">初始</Option>
                    <Option value="PreBookReg">已预约</Option>
                    <Option value="PreChecked">已预检</Option>
                    <Option value="InProgress">进行中</Option>
                    <Option value="Finished">已完成</Option>
                    <Option value="Aborted">已作废</Option>
                </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>);

    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"供应商 类似于"} >
                {getFieldDecorator("supplier")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"仓位 类似于"} >
                {getFieldDecorator("wrh")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

   return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

OrderBillSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  onToggle: PropTypes.func,
  keyword: PropTypes.string
};

export default Form.create()(OrderBillSearchForm);
