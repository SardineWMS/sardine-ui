import { Tree, Input } from 'antd';
import React, { Component, PropTypes } from 'react';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

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

class BinTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    data: this.props.data,
    onSelect: this.props.onSelect
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.data
    });
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChange = (e) => {
    generateList(this.state.data);
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, this.state.data);
      };
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
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
          <TreeNode key={item.key} title={title} nodeValue={item.title} wrhType={item.type}>
            {loop(item.children)}
          </TreeNode>
        );
      };
      return <TreeNode key={item.key} title={item.title} nodeValue={item.title} wrhType={item.type} />;
    });
    return (
      <div>
        <Search style={{ width: 200 }} placeholder="搜索..." onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.state.onSelect}
        >
          {!this.state.data || this.state.data.length == 0 ? [] : loop(this.state.data)}
        </Tree>
      </div>
    );
  };
};
export default BinTree;