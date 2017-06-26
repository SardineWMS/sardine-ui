import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';

const BinTypeModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave }) => {
    const columns = [
        {
            title: '代码',
            dataIndex: 'code',
            render: (text, record) => renderColumns(record, "binTypeCode", text)
        },
        {
            title: '名称',
            dataIndex: 'name',
            render: (text, record) => renderColumns(record, "binTypeName", text)
        },
        {
            title: '承重',
            dataIndex: 'bearing',
            render: (text, record) => renderColumns(record, "bearing", text)
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div className={styles.editable_row_operations}>
                        {record.editable ?
                            <span>
                                <a onClick={() => { onSave(record) }} disabled={!PermissionUtil("bin:create")}>保存</a>
                                <Popconfirm title={"确定要取消编辑吗？"} onConfirm={() => onCancelEdit(record)}>
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                            :
                            <span>
                                <a onClick={() => { onEdit(record) }} disabled={!PermissionUtil("bintype:edit")}>编辑</a>
                                <Popconfirm title={"确定要删除吗？"} onConfirm={() => { onDelete(record) }}>
                                    <a disabled={!PermissionUtil("bintype:delete")}>删除</a>
                                </Popconfirm>
                            </span>
                        }
                    </div>
                );
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
        if ("binTypeCode" == key)
            record.code = value;
        if ("binTypeName" == key)
            record.name = value;
        if ("bearing" == key)
            record.bearing = value;
    };

    const modalOpts = {
        title: '货位类型',
        visible,
        wrapClassName: 'vertical-center-modal',
        width: 800,
        onCancel,
        footer: [
            <Button key="return" type="primary" onClick={onCancel}>返回</Button>
        ]
    }

    return (<Modal {...modalOpts}>
        <div>
            <Button type="ghost" onClick={() => onAdd()}>增加</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false}></Table>
    </Modal>);
};

export default BinTypeModal;