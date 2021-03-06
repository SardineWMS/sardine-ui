import { Tree } from 'antd';
import React, { Component, PropTypes } from 'react';

const TreeNode = Tree.TreeNode;

class ConfigTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: this.props.onSelect
    };
  };

  render() {
    return (
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.state.onSelect}
      >
        <TreeNode title="上架" key="00020801">
          <TreeNode title="商品配置" key="0002080101" />
          <TreeNode title="商品类别存储区域" key="0002080102" />
          <TreeNode title="拣货分区存储区域" key="0002080103" />
        </TreeNode>
        <TreeNode title="配货出库" key="00020803">
          <TreeNode title="作业区域" key="0002080301" />
        </TreeNode>
        <TreeNode title="原因维护" key="00020802">
          <TreeNode title="损溢原因" key="0002080201" />
          <TreeNode title="移库原因" key="0002080202" />
          <TreeNode title="退仓原因" key="0002080203" />
        </TreeNode>
      </Tree >
    );
  }
}

export default ConfigTree;