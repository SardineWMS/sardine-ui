import styles from '../../Widget/EditTable.less';
import React, { Component, PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm,message} from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';

const confirm = Modal.confirm;
import RowEditableCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect';

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
	getArticle,
	refreshCaseQtyAndAmount
}) => {
	const columns=[];

	columns.push({
		title: '行号',
	    key: 'line',
		dataIndex: 'line',
		width: 70
	});

	columns.push({
	 	title: '商品代码',
	    key: 'articleCode',
		dataIndex: 'article',
		width: 150,	
  	    render: (text,record, index) => renderRowEditableCell(index, "articleCode", text)
	});

	columns.push({
 	    title: '商品名称',
	    key: 'articleName',
		dataIndex: 'article',
		width: 200,	
    	render:(text)=> text?text.name:null
	});

	columns.push({
 	 	title: '价格',
	    key: 'price',
		dataIndex: 'price',
		width: 100,	
	    render: (text, record, index) => renderRowEditableCell( index, "price", text)
	});

	columns.push({
 	    title: '规格',
	    key: 'qpcStr',
		dataIndex: 'qpcStr',
		width: 150,	
  	    render: (text,record, index) => renderSelectColumns(record, "qpcStr", text)
	});

	columns.push({
 		title: '数量',
	    key: 'qty',
		dataIndex: 'qty',
		width: 100,	
	    render: (text, record, index) => renderRowEditableCell( index, "qty", text)
	});

	columns.push({
		    title: '件数',
		    key: 'caseQtyStr',
			dataIndex: 'caseQtyStr',
			width: 150
	});

	columns.push({
		    title: '金额',
		    key: 'amount',
			dataIndex: 'amount',
			width: 100
	});


	if(inProgressBill){
		columns.push({
		    title: '收货数量',
		    key: 'receivedQty',
			dataIndex: 'receivedQty',
			width: 100
		});

		columns.push({
		    title: '收货件数',
		    key: 'receivedCaseQtyStr',
			dataIndex: 'receivedCaseQtyStr',
			width: 100
		});
	};

	if(editable)
	{
		columns.push({
			title: '操作',
		    dataIndex: 'operation',
		    hidden:true,
		    render: (text, record, index) => {
		      return (
		      	<div className={styles.editable_row_operations}>
		            <span>
		              <a onClick={() => onDelete(items,index)}>删除</a>
		            </span>
		     	</div>
		     	);
		    }
		});
	};


    function renderRowEditableCell(index, key, text) {
    	if(typeof text !='undefined' && typeof text.code !='undefined')
			text= text.code
    	if(editable === false)
    		return text;
	    return (<RowEditableCell
	      editable={editable}
	      value={text}
	      onBlur={value => handleChange(key, index, value)}
	      autoFocus={key == "articleCode" ? true : false}
	      status={status}
	    />);
    };

    function handleChange(key, index, value) {
		items[index][key] = value;

		if(key ==='articleCode'){
    		const article=new Object();
    		article.code=value;
			items[index]["article"] = article;
			getArticle(items,index);
		}else if(key ==='qty'){
			refreshCaseQtyAndAmount(items,index+1);
		};
  	};

  	function renderSelectColumns(record, key, text){
  		if(typeof articleQpcs =='undefined')
  			return;
        const options = [];
 		articleQpcs.map(function(qpcInfo){
		    options.push(<Option key={qpcInfo.qpcStr}>
                    {qpcInfo.qpcStr}
                </Option>)
			});
    	return (<RowEditCellSelect
            editable={editable}
            options={options}
            onChange={value => handleSelectQpcStr(record, value, key)}
            value={text}
        />);
  	};

  	function handleSelectQpcStr(record, value, key){
			var munit=null;
			articleQpcs.map(function(qpcInfo){
				if(value===qpcInfo.qpcStr){
					munit=qpcInfo.munit;
					return;
				};
			});
			record.qpcStr=value;
			record.munit=munit;
  	};



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