import React, { PropTypes } from 'react';
import { Card, Table, Button, Form} from 'antd';
import BaseForm from '../Widget/BaseForm';
import BaseFormItem from '../Widget/BaseFormItem';

const WareHouseView = ({ 
   wareHouse,
   onEdit,
   onLogin
}) => {

    function editWrh() {
        onEdit(wareHouse);
    }

    function convertState(text) {
      if (text == "online")
        return '已启用';
      if (text = "offline")
        return '已停用';
    };

    function convertAdmin(text) {
      if (text == false)
        return '否';
      if (text == true)
        return '是';
    };

    function gotoWrhHouse() {
        onLogin(wareHouse.adminCode, wareHouse.password);
    }

    const columns = [
      {
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        width: 150
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200
      }, {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
        width: 200
      }, {
        title: '是否为管理员',
        dataIndex: 'administrator',
        key: 'administrator',
        render: text => convertAdmin(text),
        width: 150
      }, {
        title: '用户状态',
        dataIndex: 'userState',
        key: 'userState',
        render: text => convertState(text),
        width: 150
      }
    ];

    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="仓库名称：" key="name">
        <span>{wareHouse.name}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="仓库简称：" key="shortName">
        <span>{wareHouse.shortName}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="仓库类型：" key="type">
        <span>{wareHouse.dcType}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="管理员：" key="admin">
        <span>{"[" + wareHouse.adminCode + "]" + wareHouse.adminName}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="管理员联系方式：" key="adminPhone">
        <span>{wareHouse.adminPhone}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="地址：" key="address">
        <span>{wareHouse.address}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="面积：" key="acreage">
        <span>{wareHouse.acreage}</span>
    </BaseFormItem>)
    basicFormItems.push(<BaseFormItem label="主页：" key="homePage">
        <span>{wareHouse.homePage ? wareHouse.homePage : '空'}</span>
    </BaseFormItem>);

    const extra = <p> <Button type="primary" icon="login" onClick={gotoWrhHouse}>进入仓库</Button> &nbsp;&nbsp;
    <Button icon="edit" onClick={editWrh}>编辑</Button></p>;

    return (
        <div>
            <Card title="仓库信息" bordered={false} extra={extra} >
               <BaseForm items={basicFormItems} />
            </Card>

            <Card title="仓库用户">
              <Table
                size="small"
                columns={columns}
                dataSource={wareHouse.users}
                bordered
                pagination={false}
                rowKey={record => record.uuid}
              />
            </Card>
        </div>
    );
};
export default WareHouseView;
