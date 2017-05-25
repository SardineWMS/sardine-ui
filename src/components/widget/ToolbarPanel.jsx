import React from 'react';
import styles from '../less/common.less';
import {Button, Col } from 'antd';
import panel from '../less/widget.css';

class ToolbarPanel extends React.Component{

  render(){
    return (
       <div className={panel.toolbar}>
         {this.props.children}
       </div>
      );
  }
}

export default ToolbarPanel;