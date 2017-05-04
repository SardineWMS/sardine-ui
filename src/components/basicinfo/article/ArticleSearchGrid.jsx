import React,{PropTypes} from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon } from 'antd';

function ArticleSearch({
	dataSource,
	onCreate,
	onEdit,
  onView,
  pagination,
  onPageChange,
}) {

	function handleCreate(e) {
		e.preventDefault();
		onCreate();
	}

	const columns = [{
    	title: '代码',
    	dataIndex: 'code',
    	key: 'code',
      render: (text, record) => <a onClick={() => onView(record)}>{text}</a>,
      sorter: true,
  	}, {
    	title: '名称',
    	dataIndex: 'name',
    	key: 'name',
      sorter: true,
  	}, {
      title: '规格',
      dataIndex: 'spec',
      key: 'spec'
    }, {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (text ? (<a href=""> {"[" + record.category.code + "]" + record.category.name} </a>) : ""),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: text => (text == "normal" ? '正常' : text),
    }, {
    	title: '保质期天数',
    	dataIndex: 'expDays',
    	key: 'expDays',
  	}, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEdit(record)}>编辑</a>
      </p>
    ),
  }
  ]

  const menu = (
    <Menu>
     <Menu.Item key="1">1st menu item</Menu.Item>
     <Menu.Item key="2">2nd menu item</Menu.Item>
     <Menu.Item key="3">3d menu item</Menu.Item>
   </Menu>
  );

  return (
    <div>
      <Table size="small"
        bordered
        columns={columns}
        title={() => 
        	<div>
            <Button onClick={handleCreate}>新增</Button>
            <Dropdown overlay={menu}>
                 <Button type="ghost" style={{ marginLeft: 8 }}>
                   更多操作 <Icon type="down" />
                 </Button>
            </Dropdown>
        	</div>
        }
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.uuid}
      />
    </div>
  )
}

ArticleSearch.propTypes = {
	dataSource: PropTypes.array,
	onCreate : PropTypes.func,
  onView : PropTypes.func,
	onEdit : PropTypes.func,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
}

export default ArticleSearch;

