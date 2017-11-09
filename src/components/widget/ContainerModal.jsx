import React, { PropTypes } from 'react';
import { Input, Icon, Form, message } from 'antd';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import ContainerSelectGrid from './ContainerSelectGrid';

class ContainerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            loading: false,
            showSelectModal: false,
            entity: {},
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShowSelect = this.handleShowSelect.bind(this);
        this.handleSelectGridCancel = this.handleSelectGridCancel.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps
        })
    };

    handleShowSelect() {
        this.setState({
            showSelectModal: true,
        })
    };

    handleSearch(e) {

        const payload = {};
        payload.token = localStorage.getItem("token");
        payload.containerBarcode = e.target.value;
        if (e.target.value == null || e.target.value == '')
            return;
        reqwest({
            url: '/swms/basicinfo/container/getByBarcode',
            method: 'get',
            data: `${stringify(payload)}`,
            type: 'json'
        }).then((data) => {
            if (data.status == "200") {
                if (data.obj == null) {
                    message.error("容器不存在", 2);
                }

            }
            else message.error("查询容器失败", 2);
            this.setState({
                entity: data.obj
            });
        })
    };

    handleSelectGridCancel() {
        this.setState({
            showSelectModal: false
        })
    };

    handleOnSelect(data) {
        this.setState({
            entity: data,
            showSelectModal: false
        });
        const e = {};
        e.target = {};
        e.target.value = data.barcode;
        this.handleChange(e);
    };

    handleChange(e) {
        const entity = {};
        entity.barcode = e.target.value;
        this.setState({
            entity: entity
        });
        this.props.onChange(e.target.value);
    };

    render() {
        const props = {
            visible: this.state.showSelectModal,
            onCancel: this.handleSelectGridCancel,
            onSelect: this.handleOnSelect,
        }
        return (
            <div>
                <Input placeholder="请选择容器：" suffix={<Icon type="ellipsis" onClick={this.handleShowSelect} />} onBlur={this.handleSearch} value={this.state.entity == null ? '' : this.state.entity.barcode} onChange={this.handleChange} />
                <ContainerSelectGrid {...props} />
            </div>
        )
    };
};

export default ContainerModal;