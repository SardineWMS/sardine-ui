import React, { PropTypes } from 'react';
import { Modal, Button, Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
class MessageModal extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      ...props
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  render() {
    const title = <span><Icon type="mail" />&nbsp;&nbsp;消息</span>;
    const footer = <Button onClick={this.state.onClose} type="primary">知道了</Button>;
    return (
      <div>
        <Modal
          title={title}
          visible={this.state.visible}
          footer={footer}
          onCancel={this.state.onClose}
        >
          <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
            <TabPane tab="系统消息" key="1">Content of tab 1</TabPane>
            <TabPane tab="仓库消息" key="2">Content of tab 2</TabPane>
            <TabPane tab="推荐消息" key="3">Content of tab 3</TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default MessageModal;