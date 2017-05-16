import React from 'react';
import styles from '../less/common.less';

class ToolbarPanel extends React.Component{
  render(){
    return (
       <div className={styles.button}>
         {this.props.children}
       </div>
      );
  }
}

export default ToolbarPanel;