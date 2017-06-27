import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';

const VehicleTypeModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave }) => {
    const columns = [
        {
            title: '代码',
            dataIndex: 'code',
            render: (text, record) => renderColumns(record, "code", text)
        },
        {
            title: '名称',
            dataIndex: 'name',
            render: (text, record) => renderColumns(record, "name", text)
        },
        {
            title: '承重(吨)',
            dataIndex: 'bearWeight',
            render: (text, record) => renderColumns(record, "bearWeight", text)
        },
        {
            title: '自重(吨)',
            dataIndex: 'weight',
            render: (text, record) => renderColumns(record, "weight", text)
        },
        {
            title: '长(m)',
            dataIndex: 'length',
            render: (text, record) => renderColumns(record, "length", text)
        },
        {
            title: '宽(m)',
            dataIndex: 'width',
            render: (text, record) => renderColumns(record, "width", text)
        },
        {
            title: '高(m)',
            dataIndex: 'height',
            render: (text, record) => renderColumns(record, "height", text)
        },
        {
            title: '体积(m³)',
            dataIndex: 'volume',
            render: (text, record) => renderColumns(record, "volume", text)
        },
        {
            title: '容积(m³)',
            dataIndex: 'bearVolume',
            render: (text, record) => renderColumns(record, "bearVolume", text)
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div className={styles.editable_row_operations}>
                        {record.editable ?
                            <span>
                                <a onClick={() => { onSave(record) }} disabled={!PermissionUtil("vehicle:createType")}>保存</a>
                                <Popconfirm title={"确定要取消编辑吗？"} onConfirm={() => onCancelEdit(record)}>
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                            :
                            <span>
                                <a onClick={() => { onEdit(record) }} disabled={!PermissionUtil("vehicle:createType")}>编辑</a>
                                <Popconfirm title={"确定要删除吗？"} onConfirm={() => { onDelete(record) }}>
                                    <a disabled={!PermissionUtil("vehicle:createType")}>删除</a>
                                </Popconfirm>
                            </span>
                        }
                    </div>
                )
            }
        }
    ];

    function renderColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCellForModal
            editable={record.editable}
            value={text}
            status={status}
            onChange={value => handleChange(record, value, key)}
            onBlur={() => { }}
        />);
    };

    function handleChange(record, value, key) {
        if ("code" == key)
            record.code = value;
        if ("name" == key)
            record.name = value;
        if ("bearWeight" == key)
            record.bearWeight = value;
        if ("weight" == key)
            record.weight = value;
        if ("length" == key)
            record.length = value;
        if ("width" == key)
            record.width = value;
        if ("height" == key)
            record.height = value;
        if ("volume" == key)
            record.volume = value;
        if ("bearVolume" == key)
            record.bearVolume = value;
    };

    const modalOpts = {
        title: '车型',
        visible,
        wrapClassName: 'vertical-center-modal',
        width: 800,
        onCancel,
        footer: [
            <Button key="return" type="primary" onClick={onCancel}>返回</Button>
        ]
    };

    return (<Modal {...modalOpts}>
        <div>
            <Button type="ghost" onClick={() => onAdd()}>增加</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false}></Table>
    </Modal>)
};

export default VehicleTypeModal;