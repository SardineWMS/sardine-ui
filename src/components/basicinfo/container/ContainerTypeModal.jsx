import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';

const ContainerTypeModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave }) => {
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
            title: '前缀',
            dataIndex: 'barCodePrefix',
            key: 'barCodePrefix',
            render: (text, record) => renderColumns(record, "barCodePrefix", text)
        },
        {
            title: '长度',
            dataIndex: 'barCodeLength',
            key: 'barCodeLength',
            render: (text, record) => renderColumns(record, "barCodeLength", text)
        },
        {
            title: '自重',
            dataIndex: 'weight',
            render: (text, record) => renderColumns(record, "weight", text)
        },
        {
            title: '承重',
            dataIndex: 'bearingWeight',
            render: (text, record) => renderColumns(record, "bearingWeight", text)
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div className={styles.editable_row_operations}>
                        {record.editable ?
                            <span>
                                <a onClick={() => { onSave(record) }} disabled={!PermissionUtil("containertype:create")}>保存</a>
                                <Popconfirm title={"确定要取消编辑吗？"} onConfirm={() => onCancelEdit(record)}>
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                            :
                            <span>
                                <a onClick={() => { onEdit(record) }} disabled={!PermissionUtil("containertype:edit")}>编辑</a>
                                <Popconfirm title={"确定要删除吗？"} onConfirm={() => { onDelete(record) }}>
                                    <a disabled={!PermissionUtil("containertype:delete")}>删除</a>
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
        />);
    };

    function handleChange(record, value, key) {
        if ("code" == key)
            record.code = value;
        if ("name" == key)
            record.name = value;
        if ("bearingWeight" == key)
            record.bearingWeight = value;
        if ("weight" == key)
            record.weight = value;
        if ("barCodePrefix" == key)
            record.barCodePrefix = value;
        if ("barCodeLength" == key)
            record.barCodeLength = value;
    };

    const modalOpts = {
        title: '容器类型',
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
            <Button type="ghost" onClick={() => onAdd()} disabled={!PermissionUtil("containertype:create")}>增加</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false}></Table>
    </Modal>);
};

export default ContainerTypeModal;