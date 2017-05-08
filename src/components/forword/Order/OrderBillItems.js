import styles from '../../Widget/EditTable.less';
import React, { Component, PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm,message} from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../Layout/common.less';

const confirm = Modal.confirm;
const RowEditableCell = require('../../Widget/RowEditCell');
const EditableCell = require('../../Widget/EditableCell');

const OrderBillItems=({
	items,
	articleQpcs,
	editable,
	inProgressBill,
	onAdd,
	onEdit,
	onDelete,
	onCancel,
	onSaveItems,
	getArticle
}) => {
	const columns=[];

	columns.push({
		title: '行号',
	    key: 'line',
		dataIndex: 'line'
	});

	columns.push({
	 	title: '商品代码',
	    key: 'articleCode',
		dataIndex: 'article',	
  	    render: (text,record, index) => renderEditableCell(index, "articleCode", text)
	});

	columns.push({
 	    title: '商品名称',
	    key: 'articleName',
		dataIndex: 'article',
    	render:(text)=> text?text.name:null
	});

	columns.push({
 	 	title: '价格',
	    key: 'price',
		dataIndex: 'price',
	    render: (text, record, index) => renderRowEditableCell( index, "price", text)
	});

	columns.push({
 	    title: '规格',
	    key: 'qpcStr',
		dataIndex: 'qpcStr',
  	    render: (text,record, index) => renderEditableCell(index, "qpcStr", text)
	});

	columns.push({
 		title: '数量',
	    key: 'qty',
		dataIndex: 'qty',
	    render: (text, record, index) => renderRowEditableCell( index, "qty", text)
	});

	if(editable===false)
	{
		columns.push({
		    title: '件数',
		    key: 'caseQtyStr',
			dataIndex: 'caseQtyStr'	
		});
	}


	if(inProgressBill){
		columns.push({
		    title: '收货数量',
		    key: 'receivedQty',
			dataIndex: 'receivedQty'	
		});

		columns.push({
		    title: '收货件数',
		    key: 'receivedCaseQtyStr',
			dataIndex: 'receivedCaseQtyStr'	
		});
	}

	if(editable)
	{
		columns.push({
			title: '操作',
		    dataIndex: 'operation',
		    hidden:true,
		    render: (text, record, index) => {
		      return (
		      	<div className={styles.editable_row_operations}>
		        {
		          record.editable ?
		            <span>
              			<a onClick={() => onSaveItems(items,index)}>保存</a>
              			<a onClick={() => onCancel(items,index)}>取消</a>
		            </span>
		            :
		            <span>
		              <a onClick={() => onEdit(items,index)}>编辑</a>
		              <a onClick={() => onDelete(items,index)}>删除</a>
		            </span>
		        }
		     	</div>
		     	);
		    }
		});
	}


    function renderRowEditableCell(index, key, text) {
    	if(typeof text !='undefined' && key==='articleCode')
    		text=text.code;
    	if(editable === false)
    		return text;
	    if (typeof items[index]["editable"] === 'undefined' || !items[index]["editable"]) {
	      	return text;
	    }
	    return (<RowEditableCell
	      editable={items[index]["editable"]}
	      value={text}
	      onChange={value => handleChange(key, index, value)}
	      autoFocus={key == "articleCode" ? true : false}
	      status={status}
	    />);
    }

    function handleChange(key, index, value) {
		items[index][key] = value;
  	}

  	function renderEditableCell(index, key, text){
		if(typeof text !='undefined' && typeof text.code !='undefined')
			text= text.code
	    if (typeof items[index]["editable"] === 'undefined' || !items[index]["editable"]) {
	      	return text;
	    }
        return (
	        <EditableCell
	          value={text}	
	          onChange={value => handleEnter(key,index, value)}
	          editable={items[index]["editable"]}
	        />);
  	}

    function handleEnter(key,  index, value) {
    	if(typeof value =='undefined')
    		return;
		if(key ==='articleCode'){
    		const article=new Object();
    		article.code=value;
			items[index]["article"] = article;
			getArticle(items,index);
		}else if(key==='qpcStr'){
			var munit=null;
			articleQpcs.map(function(qpcInfo){
				if(value===qpcInfo.qpcStr)
					munit=qpcInfo.munit;
			});
		    if(munit){
				items[index]["qpcStr"] = value;
				items[index]["munit"] = munit;
		    }else{
		    	message.error("规格错误：商品中没有设置该规格！",2,'');
		    }

		}
  	}

    return (
    	<div>
    		{
    			editable?
		    	<div className={commonStyles.button} >
			    	<Button type="ghost" onClick={() => onAdd(items)}>增加</Button>
			    </div>
			    :
			    <div/>
			}
	    	<Table bordered dataSource={items} columns={columns} size="small" pagination = {false} />
		</div>
	);

};

export default OrderBillItems;