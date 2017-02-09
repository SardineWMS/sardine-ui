import React from 'react';
import { Modal, Progress,Button} from 'antd';

class WMSProgress extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
       showProgressModal:false,
       showConfirmModal:false,
       percent:0,
       records:[],
       processing:false,
       recordIndex:0,
       report:{
          total:0,
          success:0,
          failure:0,
          skipped:0,
       }
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.start = this.start.bind(this);
    this.abort = this.abort.bind(this);
  }

  componentWillReceiveProps(newProps){
      if(newProps.next){
        this.start();
      } else {
        this.setState({
          records : newProps.records,
          showConfirmModal : newProps.showConfirmModal,
          percent:0,
          processing:true,
          recordIndex:0,
        });
      }
  }

  handleOk(){
    this.setState({
      showConfirmModal : false,
      showProgressModal : true,
    });
    this.start();
  }

  handleCancel(){
    this.setState({
      showConfirmModal : false,
      showProgressModal : false,
      processing : false,
    },function(){
      this.props.refreshGrid();
    });
  }

  start() {
    if (this.state.records == null || this.state.records.length == 0)
      return;

    let currPercent = this.state.percent;
    let percent = (this.state.recordIndex+1) * Math.ceil(100 / this.props.records.length);
    let processing = this.state.processing;

    if(processing == false || this.state.recordIndex + 1 > this.props.records.length){
      return;
    }

    if (percent >= 100) {
      percent = 100;
      processing = false;
    }

    this.setState({
      processing:processing,
      percent,
      recordIndex: this.state.recordIndex + 1,
      showProgress: true,
    }, function() {  
      this.props.batchProcess();
    });
  }

  abort(){
     if(this.state.processing == false){
      return;
    }

    this.setState({
      processing : false,
    })
  }

  render() {
  return (
    <div>
    <Modal title="批量处理框" visible={this.state.showConfirmModal}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="确定" cancelText="取消"
        >
      <p>{`是否批量生成 ${this.state.records.length} 个容器?`}</p>
    </Modal>
    <Modal title="可怕的进度条君" visible={this.state.showProgressModal}
      onCancel={this.handleCancel} footer={[]} >
        <Progress percent={this.state.percent} />
        {this.state.processing ?
        <Button onClick={this.abort}>中断</Button> : <p> {`批量处理完成。 
        总共生成 ${this.state.recordIndex} 个容器。`} </p>
        }
    </Modal>
    </div>  
    );
  }
}  


export default WMSProgress;