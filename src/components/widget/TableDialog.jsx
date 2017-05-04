import { Modal, Button } from 'antd';

const TableDialog = React.createClass({
  getInitialState() {
    return { visible: false,
    value: null,
    columns: null };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  },
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },
  const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
  };

  render() {
    return (
      <div>
        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
        <Table bordered rowSelection={rowSelection} dataSource={this.state.dataSource} columns={this.state.columns} />
        </Modal>
      </div>
    );
  },
});

export default TableDialog;