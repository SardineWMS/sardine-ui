import React from 'react';
import { Table,Button,Pagination} from 'antd';

class EntityLogGrid extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
       dataSource:[],
        pagination:{
        total:0,
        current:0,
       }
    };
    this.refreshGridOnPage = this.refreshGridOnPage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.props.onPageChange();
  }

  componentWillReceiveProps(newProps){
      this.setState({
          dataSource : newProps.dataSource,
          pagination: newProps.pagination,
        });
  }

  refreshGridOnPage(){
    this.props.onPageChange(page);
  }

  handleCancel(){
    this.props.onBack();
  }

  render() {
  const columns = [{
    title: '操作人',
    dataIndex: 'operateInfo',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
  },{
    title: '事件',
    dataIndex: 'event',
  },{
    title: '描述',
    dataIndex: 'message',
  }]

  return (
  <div>
            <Table 
                size="small"
                columns={columns}
                dataSource={this.state.dataSource}
                onChange={this.refreshGridOnPage}
                pagination={this.state.pagination}
                rowKey={record => record.uuid}
                title={
                  ()=>
                  <div>
                    <Button onClick={this.handleCancel}>返回</Button>
                  </div>
                }
            />
        </div>
    );
  }
}  

export default EntityLogGrid;
