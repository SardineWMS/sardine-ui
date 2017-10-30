import React from 'react';
import { Tree, Input, Button } from 'antd';
import ReactDOM from 'react-dom';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        };
    };
    if (_level < 0) {
        return tns;
    };
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children, node.key);
        };
    };
};
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            };
        };
    };
    return parentKey;
};

class SerialArchTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            data: this.props.data,
            onSelect: this.props.onSelect
        };
    };

    componentDidMount() {
        this.getContainer();
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.data
        });
    };

    componentWillUnmount() {
        if (this.cmContainer) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            document.body.removeChild(this.cmContainer);
            this.cmContainer = null;
        }
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };
    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.key.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
            };
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        });
    };
    onMouseEnter = (info) => {
        this.renderCommand(info);
    };

    onRemove = (code, e) => {
        e.preventDefault();
        if (this.cmContainer)
            ReactDOM.unmountComponentAtNode(this.cmContainer);
        this.props.onRemoveLine(code)
    }
    onMouseLeave = (info) => {
        // if (this.cmContainer)
        //     ReactDOM.unmountComponentAtNode(this.cmContainer);
    };
    renderCommand = (info) => {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
        this.toolTip = (
            <Button onClick={this.onRemove.bind(this, info.node.props.eventKey)}>删除</Button>);

        const container = this.getContainer();
        Object.assign(this.cmContainer.style, {
            position: 'absolute',
            left: `${info.event.pageX}px`,
            top: `${info.event.pageY}px`,
        });
        ReactDOM.render(this.toolTip, container);
    };

    getContainer() {
        if (!this.cmContainer) {
            this.cmContainer = document.createElement('div');
            document.body.appendChild(this.cmContainer);
        }
        return this.cmContainer;
    };
    render() {
        const { searchValue, expandedKeys, autoExpandParent, data } = this.state;
        const loop = data => data.map((item) => {
            const index = item.key.search(searchValue);
            const beforeStr = item.key.substr(0, index);
            const afterStr = item.key.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.key}</span>;
            if (item.children) {
                return (
                    <div>
                        <TreeNode key={item.key} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                        <Button>删除</Button>
                    </div>
                );
            };
            return <TreeNode key={item.key} title={title} />;
        });
        return (
            <div onMouseLeave={this.onMouseLeave}>
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={this.state.onSelect}
                    onRightClick={() => { alert(1113334) }}
                    onMouseEnter={this.onMouseEnter}
                >
                    {!this.state.data || this.state.data.length == 0 ? [] : loop(this.state.data)}
                </Tree>
            </div>
        );
    };
};

export default SerialArchTree;