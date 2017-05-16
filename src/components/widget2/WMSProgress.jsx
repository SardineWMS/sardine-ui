import React from 'react';
import { Modal, Progress, Button } from 'antd';

class WMSProgress extends React.Component {
  constructor(props) {
    console.log("constructor...");
    console.dir(props);
    super(props);
    this.state = {
      showProgressModal: false,
      showConfirmModal: false,
      percent: 0,
      records: [],
      processing: false,
      recordIndex: 0,
      actionText: this.props.actionText,
      entityCaption: this.props.entityCaption,
      report: {
        total: 0,
        success: 0,
        failure: 0,
        skipped: 0,
      }
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.start = this.start.bind(this);
    this.abort = this.abort.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps...");
    console.dir(newProps);
    this.setState({
      records: newProps.records,
      showConfirmModal: newProps.showConfirmModal,
    });
  }

  handleOk() {
    this.setState({
      showConfirmModal: false,
      showProgressModal: true,
    }, function () {
      this.start();
    });
  }

  handleCancel() {
    this.setState({
      showConfirmModal: false,
      showProgressModal: false,
      processing: false,
      percent: 0,
      records: [],
      recordIndex: 0,
    }, function () {
      this.props.hideConfirmModal();
      this.props.refreshGrid();
    });
  }

  start() {
    console.log("start...");
    console.dir(this.state);
    if (this.state.records == null || this.state.records.length == 0)
      return;

    let currPercent = this.state.percent;
    let percent = (this.state.recordIndex + 1) * Math.ceil(100 / this.props.records.length);
    let processing = this.state.processing;

    if (this.state.recordIndex + 1 > this.props.records.length) {
      return;
    }

    if (percent >= 100) {
      percent = 100;
      processing = false;
    }

    var index = this.state.recordIndex;
    this.props.batchProcess(this.state.records[index]);

    this.setState({
      processing: processing,
      percent,
      recordIndex: this.state.recordIndex + 1,
    }, function () {
      this.start();
    });
  }

  abort() {
    if (this.state.processing == false) {
      return;
    }

    this.setState({
      processing: false,
    })
  }

  render() {
    return (
      <div>
        <Modal title="批量处理框" visible={this.state.showConfirmModal}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="确定" cancelText="取消"
        >
          <p>{`是否批量${this.state.actionText} ${this.state.records.length} 个${this.state.entityCaption}?`}</p>
        </Modal>
        <Modal title="可怕的进度条君" visible={this.state.showProgressModal}
          onCancel={this.handleCancel} footer={[]} >
          <Progress percent={this.state.percent} />
          {this.state.processing ?
            <Button onClick={this.abort}>中断</Button> : <p> {`批量处理完成。 
        总共${this.state.actionText} ${this.state.recordIndex} 个${this.state.entityCaption}。`} </p>
          }
        </Modal>
      </div>
    );
  }
}


export default WMSProgress;