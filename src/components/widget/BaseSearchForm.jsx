import React from 'react';
import { Form, Row, Col, Button, Collapse } from 'antd';

/** 
    搜索条件面板，自带搜索和清除按钮，后续如果有需要会增加搜索条件的收缩功能，搜索和清除的事件需自定义
    handleSearch：搜索事件
    handleReset：清除事件
 **/
  function BaseSearchForm ({
      form,
      onSearch,
      children
  }) {

    function handleSearch(e) {
        e.preventDefault();
        onSearch(form.getFieldsValue());
    };

    function handleReset(e) {
        e.preventDefault();
        form.resetFields();
    };

    return (
        <Collapse defaultActiveKey={["1"]} >
            <Collapse.Panel header="搜索" key="1">
                <Form onSubmit={handleSearch}>
                    <Row gutter={40}>
                        {children}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>清除</Button>
                        </Col>
                    </Row>
                </Form>
            </Collapse.Panel>
        </Collapse>
    );
  };

export default BaseSearchForm;
