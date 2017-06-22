import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function ArticleConfigSearchGrid({
	  loading,
	  dataSource,
	  pagination,
	  onPageChange,
	  onSetArticleFixedPickBin,
	  onSetPickBinStockLimit,
	  onSetArticleStorageArea,
	  selectedRowKeys = []
}) {

    function handlerSetArticleFixedPickBin(){
        onSetArticleFixedPickBin(selectedRowKeys);
    };
    function handlerSetPickBinStockLimit(){
        onSetPickBinStockLimit(selectedRowKeys);
    };
    function handlerSetArticleStorageArea(){
        onSetArticleStorageArea(selectedRowKeys);
    };


    const columns=
    [
        {
            title: '商品',
            dataIndex: 'article',
            key: 'article',
            render: text => ("["+text.code+"]"+text.name),
            sorter: true,
        },
        {
            title: '固定拣货位',
            dataIndex: 'fixedPickBin',
            key: 'fixedPickBin'
        },
        {  
            title: '拣货规格',
            dataIndex: 'pickBinStockLimit',
            key: 'pickUpQpcStr',
            render: text => text==null?"": text.pickUpQpcStr
        },
        {
            title: '最高库存',
            dataIndex: 'pickBinStockLimit',
            key: 'highQty',
            render: text => text==null?"": text.highQty
        },
        {
            title:'最低库存',
            dataIndex:'pickBinStockLimit',
            key:'lowQty',
            render: text => text==null?"": text.lowQty
        },
        {  
            title: '存储区域',
            dataIndex: 'storageArea',
            key: 'storageArea'
        }  
    ]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
            selectedRowKeys=selectedRows;
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
            selectedRowKeys=selectedRows;
      },
      getCheckboxProps: record => ({
         disabled: record.name === 'Disabled User',
      }),
    };

    return(
        <div>
            <Table size="small"  bordered rowSelection={rowSelection}
                columns={columns} 
                title={
                    ()=>
                    <div>
                        <Button onClick={handlerSetArticleFixedPickBin}> 设置固定拣货位</Button>
                        <Button onClick={handlerSetPickBinStockLimit}> 设置最高最低库存</Button>
                        <Button onClick={handlerSetArticleStorageArea}> 设置存储区域</Button>
                    </div>
                }
                dataSource={dataSource}
                loading={loading}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={record => record.uuid}
            />
        </div>
    )
}

ArticleConfigSearchGrid.propTypes={
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onCreate : PropTypes.func,
    onViewAcceptanceBill : PropTypes.func,
    onDeleteBatch : PropTypes.func,
    onFinishBatch : PropTypes.func,
    onAbortBatch : PropTypes.func
    
}

export default ArticleConfigSearchGrid;