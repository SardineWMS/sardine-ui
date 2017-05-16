import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;
import { connect } from 'dva';
import BinSearch from '../../components/basicinfo/Bin/Bin';
import CreateBinModal from '../../components/basicinfo/Bin/CreateBinModal';
import CreateShelfModal from '../../components/basicinfo/Bin/CreateShelfModal';
import CreatePathModal from '../../components/basicinfo/Bin/CreatePathModal';
import CreateZoneModal from '../../components/basicinfo/Bin/CreateZoneModal';
import CreateWrhModal from '../../components/basicinfo/Bin/CreateWrhModal';
import BinTree from '../../components/basicinfo/Bin/BinTree';
import BinSearchForm from '../../components/basicinfo/Bin/BinSearchForm';
import WMSProgress from '../../components/Widget/WMSProgress';
import BinTypeModal from '../../components/basicinfo/Bin/BinTypeModal';

function Bin({ location, dispatch, bin }) {
  const { list, wrhModalVisible, zoneModalVisible, shelfModalVisible, pathModalVisible, binModalVisible, treeData,
    wrhs, zones, batchCreatePathProcessModal, batchCreateShelfProcessModal, batchCreateBinProcessModal, pathNext,
    shelfNext, binNext, pathEntitys, shelfEntitys, binEntitys, binTypes, deleteBinEntitys, batchDeleteBinProcessModal, binTypeList,
    binTypeModalVisible,
    } = bin;

  const { field, keyword } = location.query

  const CreateWrhModalProps = {
    visible: wrhModalVisible,
    onOk(data) {
      dispatch({
        type: `bin/createWrh`,
        payload: {
          code: data.code,
          name: data.name,
          note: data.remark,
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'bin/hideWrhModal',
      })
    },
  }

  const CreateZoneModalProps = {
    visible: zoneModalVisible,
    wrhs: wrhs,
    onOk(data) {
      dispatch({
        type: `bin/createZone`,
        payload: {
          code: data.code,
          name: data.name,
          note: data.remark,
          wrhUuid: data.wrh,
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'bin/hideZoneModal',
      })
    },
  }

  const CreatePathModalProps = {
    visible: pathModalVisible,
    zones: zones,
    onOk(data) {
      dispatch({
        type: 'bin/batchSavePath',
        payload: {
          pathEntitys: data
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'bin/hidePathModal',
      })
    },
  }

  const CreateShelfModalProps = {
    visible: shelfModalVisible,
    treeData: treeData,
    onOk(data) {
      dispatch({
        type: 'bin/batchSaveShelf',
        payload: {
          shelfEntitys: data
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'bin/hideShelfModal',
      })
    },
  }

  const CreateBinModalProps = {
    visible: binModalVisible,
    binTypes: binTypes,
    treeData: treeData,
    onOk(data) {
      dispatch({
        type: 'bin/batchSaveBin',
        payload: {
          binEntitys: data
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'bin/hideBinModal',
      })
    },
  }

  const batchProcessPathModalProps = {
    showConfirmModal: batchCreatePathProcessModal,
    records: pathEntitys ? pathEntitys : [],
    next: pathNext,
    actionText: '创建',
    entityCaption: '货道',
    batchProcess(entity) {
      dispatch({
        type: 'bin/createPath',
        payload: {
          zoneUuid: entity,
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hidePathModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin',
      })
    },
  }

  const batchProcessShelfModalProps = {
    showConfirmModal: batchCreateShelfProcessModal,
    records: shelfEntitys ? shelfEntitys : [],
    next: shelfNext,
    actionText: '创建',
    entityCaption: '货架',
    batchProcess(entity) {
      dispatch({
        type: 'bin/createShelf',
        payload: {
          pathCode: entity,
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideShelfModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin',
      })
    },
  }

  const batchProcessBinModalProps = {
    showConfirmModal: batchCreateBinProcessModal,
    records: binEntitys ? binEntitys : [],
    next: binNext,
    actionText: '创建',
    entityCaption: '货位',
    batchProcess(entity) {
      dispatch({
        type: 'bin/createBin',
        payload: {
          binTypeUuid: entity.binTypeUuid,
          binUsage: entity.usage,
          code: entity.code,
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideBinModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin',
      })
    },
  }

  const batchProcessDeleteBinModalProps = {
    showConfirmModal: batchDeleteBinProcessModal,
    records: deleteBinEntitys ? deleteBinEntitys : [],
    next: binNext,
    actionText: '删除',
    entityCaption: '货位',
    batchProcess(entity) {
      dispatch({
        type: 'bin/deleteBin',
        payload: {
          uuid: entity.uuid,
          version: entity.version,
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideDeleteBinModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin',
      })
    },
  }

  const binSearchFormProps = {
    list: list,
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'bin/queryBin',
        payload: {
          code: fieldsValue.code,
          usage: fieldsValue.usage,
          state: fieldsValue.state,
        }
      })
    },
  }

  const binTreeProps = {
    data: treeData,
    onSelect(selectKeys, e) {
      let wrhUuid, zoneUuid, pathUuid, shelfUuid;
      if (e.node.props.wrhType == 'wrh') {
        wrhUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'zone') {
        zoneUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'path') {
        pathUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'shelf') {
        shelfUuid = e.node.props.nodeValue;
      }
      dispatch({
        type: 'bin/queryBin',
        payload: {
          wrhUuid: wrhUuid,
          zoneUuid: zoneUuid,
          pathUuid: pathUuid,
          shelfUuid: shelfUuid
        }
      })
    }
  }

  const binSearchProps = {
    dataSource: list,
    onPageChange(page, filters, sorter) {
      dispatch({
        type: 'bin/queryBin',
        payload: {
          sort: sorter.columnKey,
          order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
        }
      })
    },
    onCreateWrh() {
      dispatch({
        type: 'bin/showWrhModal',
      })
    },
    onCreateZone() {
      dispatch({
        type: 'bin/queryWrhsAndShowZoneModal',
      })
    },
    onCreateShelf() {
      dispatch({
        type: 'bin/showShelfModal',
      })
    },
    onCreatePath() {
      dispatch({
        type: 'bin/queryZonesAndShowPathModal',
      })
    },
    onCreateBin() {
      dispatch({
        type: 'bin/queryBinTypesAndShowBinModal',
      })
    },
    onDeleteBin(data) {
      dispatch({
        type: 'bin/batchDeleteBin',
        payload: {
          deleteBinEntitys: data
        }
      })
    },
    onCreateBinType() {
      dispatch({
        type: 'bin/queryBinType',
        payload: {

        }
      })
    }
  }

  const binTypeModalProps = {
    dataSource: binTypeList,
    visible: binTypeModalVisible,
    onCancel() {
      dispatch({
        type: 'bin/hideBinTypeModal',
      })
    },
    onEdit(record) {
      record.editable = true;
      dispatch({
        type: 'bin/queryBinTypeSuccess',
        payload: record,
      })
    },
    onCancelEdit(record) {
      record.editable = false;
      if (!record.uuid) {
        dispatch({
          type: 'bin/queryBinType',
        })
      }
      else {
        dispatch({
          type: 'bin/queryBinTypeSuccess',
          payload: record,
        })
      }
    },
    onAdd() {
      dispatch({
        type: 'bin/addBinTypeLine',
      })
    },
    onDelete(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'bin/queryBinType',
        })
      else
        dispatch({
          type: 'bin/deleteBinType',
          payload: record,
        })
    },
    onSave(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'bin/saveNewBinType',
          payload: record,
        })
      else
        dispatch({
          type: 'bin/saveModifyBinType',
          payload: record,
        })
    }
  }

  const CreateWrhModalGen = () =>
    <CreateWrhModal {...CreateWrhModalProps} />
  const CreateZoneModalGen = () =>
    <CreateZoneModal {...CreateZoneModalProps} />
  const CreateShelfModalGen = () =>
    <CreateShelfModal {...CreateShelfModalProps} />
  const CreatePathModalGen = () =>
    <CreatePathModal {...CreatePathModalProps} />
  const CreateBinModalGen = () =>
    <CreateBinModal {...CreateBinModalProps} />

  return (
    <div className="content-inner">
      <Layout style={{ padding: '0 0', background: '#fff' }}>
        <Sider width={210} style={{ background: '#fff', padding: '0 5px' }}>
          <BinTree {...binTreeProps} />
        </Sider>
        <Content style={{ padding: '0 0 0 5px', minHeight: 280 }}>
          <BinSearchForm {...binSearchFormProps} />
          <BinSearch {...binSearchProps} />
          <CreateWrhModalGen />
          <CreateZoneModalGen />
          <CreateShelfModalGen />
          <CreatePathModalGen />
          <CreateBinModalGen />
          <BinTypeModal {...binTypeModalProps} />
          <WMSProgress {...batchProcessPathModalProps} />
          <WMSProgress {...batchProcessShelfModalProps} />
          <WMSProgress {...batchProcessBinModalProps} />
          <WMSProgress {...batchProcessDeleteBinModalProps} />
        </Content>
      </Layout>
    </div>
  )
}

Bin.propTypes = {
  bin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({ bin }) {
  return { bin }
}

export default connect(mapStateToProps)(Bin);