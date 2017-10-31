import React, { PropTypes } from 'react';
import { Input, Icon, message } from 'antd';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import UserSelectGrid from './UserSelectGrid';

/**
 * 整个空间的布局是一个带有后缀的输入框，输入框有一个onBlur事件，会根据代码查询用户。后缀的点击时间控制UserSelectGrid的展示
 * 使用场景：新建编辑时，作为表单控件使用，放置在FormItem中，可以被getFieldDecorator修饰。可以通过getFieldsValue获取控件的值
 */
class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            loading: false,
            showSelectModal: false,
            value: props.value,
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
        if (e.target.value == null || e.target.value == '')
            return;
        const payload = {};
        payload.token = localStorage.getItem("token");
        payload.userCode = e.target.value;
        reqwest({
            url: '/swms/ia/user/getbycode',
            method: 'get',
            data: `${stringify(payload)}`,
            type: 'json'
        }).then((data) => {
            if (data.status == "200") {
                if (data.obj == null) {
                    message.error("用户不存在", 2);
                }

            }
            else message.error("查询用户失败", 2);
            this.setState({
                value: data.obj
                    ? data.obj.code : ''
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
            value: data.code,
            showSelectModal: false
        });
        const e = {};
        e.target = {};
        e.target.value = data.code;
        this.handleChange(e);
    };

    handleChange(e) {
        this.setState({
            value: e.target.value
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
                <Input placeholder="请选择：" suffix={<Icon type="ellipsis" onClick={this.handleShowSelect} />} value={this.state.value} onChange={this.handleChange} onBlur={this.handleSearch} />
                <UserSelectGrid {...props} />
            </div>
        )
    };
};

export default UserModal;