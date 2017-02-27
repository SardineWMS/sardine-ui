import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,Card ,Collapse,Icon,Table ,Spin} from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;

const ContainerSearch = ({
	dataSource,
	onCreate,
  onPageChange,
  pagination,
  onSearch,
  onToggle,
  onQueryStock,
  searchExpand,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
}) => {

  function handleSearch(e) {
    e.preventDefault();
    onSearch(getFieldsValue());
  }

  function handleReset(e) {
    e.preventDefault();
  }

  function handleCreate(e) {
    e.preventDefault();
    onCreate();
  }

  const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
  };

  const children = [];
  children.push(
    <Col span={12} key='barcode'>
      <FormItem {...formItemLayout} label="条码 类似于">
        {getFieldDecorator('barcode')(
          <Input type="text" placeholder="条码 类似于"/>
          )}
      </FormItem>
      </Col>);
  children.push(<Col span={12} key='state'>
      <FormItem {...formItemLayout} label="状态 等于">
        {getFieldDecorator('state')(
          <Input type="text" placeholder="状态 等于"/>
        )}
        </FormItem>
      </Col>);
    children.push(<Col span={12} key='position'>
      <FormItem {...formItemLayout} label="当前位置 等于">
        {getFieldDecorator('position')(
          <Input type="text" placeholder="当前位置 等于"/>
        )}
        </FormItem>
      </Col>);
      children.push(<Col span={12} key='toPosition'>
      <FormItem {...formItemLayout} label="目标位置 等于">
        {getFieldDecorator('toPosition')(
          <Input type="text" placeholder="目标位置 等于"/>
        )}
        </FormItem>
      </Col>);

    const shownCount = searchExpand ? children.length : 2;

	const columns = [{
    	title: '条码',
    	dataIndex: 'barcode',
    	key: 'barcode'
  	}, {
    	title: '状态',
    	dataIndex: 'state',
    	key: 'state',
      render: text => (text == "STACONTAINERIDLE" ? '空闲' : text),
  	}, {
    	title: '当前位置',
    	dataIndex: 'position',
    	key: 'position',
  	},{
      title: '目标位置',
      dataIndex: 'toPosition',
      key: 'toPosition',
    },{
      title: '操作信息',
      dataIndex: 'operatorInfo',
      key: 'operatorInfo',
    }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onQueryStock(record)}> 库存详细信息 </a>
      </p>
    ),
  }
  ]

  return (
    <div>
       <Collapse defaultActiveKey={["1"]}>
            <Panel header="搜索" key="1">
      <Form horizontal
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, shownCount)}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" icon="search">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              清除
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => onToggle(searchExpand)}>
              高级搜索 <Icon type={searchExpand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
      </Panel>
      </Collapse>

        <Table size="small"
          bordered
          columns={columns}
          title={() => 
        	 <div>
              <Button onClick={handleCreate}>新建</Button>
        	 </div>
          }
          dataSource={dataSource}
          onChange={onPageChange}
          pagination={pagination}
          rowKey={record => record.barcode}
      />
    </div>
  )
}

ContainerSearch.propTypes = {
  form: PropTypes.object.isRequired,
  dataSource: PropTypes.array,
  onCreate : PropTypes.func,
  onPageChange: PropTypes.func,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  searchExpand: PropTypes.bool,
  onQueryStock: PropTypes.func,
}

export default Form.create()(ContainerSearch);

