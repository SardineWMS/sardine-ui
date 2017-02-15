import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;
import { connect } from 'dva';
import BinSearch from '../../components/BasicInfo/Bin/Bin';
import CreateBinModal from '../../components/BasicInfo/Bin/CreateBinModal';
import CreateShelfModal from '../../components/BasicInfo/Bin/CreateShelfModal';
import CreatePathModal from '../../components/BasicInfo/Bin/CreatePathModal';
import CreateZoneModal from '../../components/BasicInfo/Bin/CreateZoneModal';
import CreateWrhModal from '../../components/BasicInfo/Bin/CreateWrhModal';
import BinTree from '../../components/BasicInfo/Bin/BinTree';
import BinSearchForm from '../../components/BasicInfo/Bin/BinSearchForm';
import WMSProgress from '../../components/Widget/WMSProgress';

function Bin({ location, dispatch, bin }) {
  const {
      loading, list, wrhModalVisible,zoneModalVisible,shelfModalVisible,pathModalVisible,binModalVisible, treeData,
      wrhs, zones, batchCreatePathProcessModal, batchCreateShelfProcessModal, batchCreateBinProcessModal, pathNext, 
      shelfNext, binNext, pathEntitys, shelfEntitys, binEntitys, binTypes, deleteBinEntitys, batchDeleteBinProcessModal
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
          token: localStorage.getItem("token")}
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
          token: localStorage.getItem("token")}
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
        type : 'bin/batchSavePath',
        payload :{
          pathEntitys : data
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
    onOk(data) {
      dispatch({
        type : 'bin/batchSaveShelf',
        payload :{
          shelfEntitys : data
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
    onOk(data) {
      dispatch({
        type : 'bin/batchSaveBin',
        payload :{
          binEntitys : data
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
    next:pathNext,
    actionText: '创建',
    entityCaption: '货道',
    batchProcess(entity){
      dispatch({
        type: 'bin/createPath',
        payload: {
          zoneUuid: entity,
          token: localStorage.getItem("token")
        }
      })
    },
    hideConfirmModal(){
      dispatch({
        type: 'bin/hidePathModal',
      })
    },
    refreshGrid(){
      dispatch({
        type: 'bin/queryBin',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
  }

  const batchProcessShelfModalProps = {
    showConfirmModal: batchCreateShelfProcessModal,
    records: shelfEntitys ? shelfEntitys : [],
    next:shelfNext,
    actionText: '创建',
    entityCaption: '货架',
    batchProcess(entity){
      dispatch({
        type: 'bin/createShelf',
        payload: {
          pathCode: entity,
          token: localStorage.getItem("token")
        }
      })
    },
    hideConfirmModal(){
      dispatch({
        type: 'bin/hideShelfModal',
      })
    },
    refreshGrid(){
      dispatch({
        type: 'bin/queryBin',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
  }

  const batchProcessBinModalProps = {
    showConfirmModal: batchCreateBinProcessModal,
    records: binEntitys ? binEntitys : [],
    next:binNext,
    actionText: '创建',
    entityCaption: '货位',
    batchProcess(entity){
      dispatch({
        type: 'bin/createBin',
        payload: {
          binTypeUuid: entity.binTypeUuid,
          binUsage: entity.usage,
          code: entity.code,
          token: localStorage.getItem("token")
        }
      })
    },
    hideConfirmModal(){
      dispatch({
        type: 'bin/hideBinModal',
      })
    },
    refreshGrid(){
      dispatch({
        type: 'bin/queryBin',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
  }

  const batchProcessDeleteBinModalProps = {
    showConfirmModal: batchDeleteBinProcessModal,
    records: deleteBinEntitys ? deleteBinEntitys : [],
    next:binNext,
    actionText: '删除',
    entityCaption: '货位',
    batchProcess(entity){
      dispatch({
        type: 'bin/deleteBin',
        payload: {
          uuid: entity.uuid,
          version: entity.version,
          token: localStorage.getItem("token")
        }
      })
    },
    hideConfirmModal(){
      dispatch({
        type: 'bin/hideDeleteBinModal',
      })
    },
    refreshGrid(){
      dispatch({
        type: 'bin/queryBin',
        payload: {
          token: localStorage.getItem("token")
        }
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
        payload: {fieldsValue,
          token: localStorage.getItem("token")
        }
      })
      },
  }

  const binTreeProps = {
    data: treeData,
    onSelect(selectKeys, e){
      let wrhUuid, zoneUuid, pathUuid, shelfUuid;
      if(e.node.props.wrhType == 'wrh'){
        wrhUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'zone'){
        zoneUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'path'){
        pathUuid = e.node.props.nodeValue;
      } else if (e.node.props.wrhType == 'shelf'){
        shelfUuid = e.node.props.nodeValue;
      }
      dispatch({
        type: 'bin/queryBin',
        payload: {
          token: localStorage.getItem("token"),
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
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/wms/basicInfo/bin',
      }))
    },
    onCreateWrh(){
      dispatch({
        type: 'bin/showWrhModal',
      })
    },
    onCreateZone(){
      dispatch({
        type: 'bin/queryWrhsAndShowZoneModal',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
    onCreateShelf(){
      dispatch({
        type: 'bin/showShelfModal',
      })
    },
    onCreatePath(){
      dispatch({
        type: 'bin/queryZonesAndShowPathModal',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
    onCreateBin(){
      dispatch({
        type: 'bin/queryBinTypesAndShowBinModal',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    },
    onDeleteBin(data) {
      dispatch({
        type : 'bin/batchDeleteBin',
        payload :{
          deleteBinEntitys : data
        }
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
              <Sider width={150} style={{ background: '#fff', padding: '0 5px' }}>
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