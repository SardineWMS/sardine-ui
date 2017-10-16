import React, { PropTypes } from 'react';
import { Select, Form } from "antd";
import reqwest from "reqwest";
import { stringify } from "qs";
const Option = Select.Option;

/**
 * 与WrhSelect的区别在于，Option的值是wrh的UUID，而WrhSelect中是wrh的code。
 * 搜索模块使用WrhSelect，因为目前后台基本上都是按仓位的代码查询，新增时可以使用该组件。后续可以把后台服务中仓位查询sql都改成按UUID查询，就可以只用一个组件
 */
class WrhSelectWithUuid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            wrhs: [],
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    };

    /**
     * 该方法中调用setState，本次的render函数可以看到最新的state
     */
    componentWillMount() {
        const payload = {};
        payload.token = 'token';
        reqwest({
            url: '/swms/basicinfo/bin/queryWrhs',
            method: 'get',
            data: `${stringify(payload)}`,
            type: 'json'
        }).then((data) => {
            this.setState({ wrhs: data.obj })
        })
    };

    componentWillReceiveProps(newProps) {
        this.setState({ ...newProps });
    };

    handleChange = (value) => {
        this.setState({ value });
        this.props.onChange(value);//自定义表单控件，主要有两点：value和onChange方法，在这里onChange方法中必须要调用一次props中的onChange方法，否则Form中无法通过getFieldDecorator获取到控件的值
    }

    render() {
        const wrhs = this.state.wrhs;
        const options = [];
        for (var wrh of wrhs) {
            options.push(<Option key={wrh.uuid}>{"[" + wrh.code + "]" + wrh.name}</Option>)
        };
        return <Select placeholder="请选择：" onChange={this.handleChange} value={this.state.value}>
            {options}
        </Select>;
    }
};

export default WrhSelectWithUuid;