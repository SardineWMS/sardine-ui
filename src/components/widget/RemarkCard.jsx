import React from 'react';
import { Card, Input } from 'antd';
import Panel from './Panel';


/** 说明字段Card，占据正行，可设置是否可编辑，用法如下
  可编辑：<RemarkCard remark={"12313123"} editable={true} />
  只读：<RemarkCard remark={"12313123"} />
 */
class RemarkCard extends React.Component {

  render() {
    let editable = this.props.editable;
    return (
      <Panel title="说明">
        {editable ? (<Input type="textarea" autosize={{ minRows: 4 }} defaultValue={this.props.remark} />) :
          (<Input type="textarea" autosize={{ minRows: 4 }} defaultValue={this.props.remark} disabled={true} />)}
      </Panel>
    );
  };
};

export default RemarkCard;
