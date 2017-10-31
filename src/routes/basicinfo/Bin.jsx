import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Layout, message } from 'antd';
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
import CloseWrhModal from '../../components/basicinfo/Bin/CloseWrhModal';
import ReleaseWrhModal from '../../components/basicinfo/Bin/ReleaseWrhModal';
import BinStockInfo from '../../components/basicinfo/Bin/BinStockInfo';

function Bin({ location, dispatch, bin }) {
  const { list, wrhModalVisible, zoneModalVisible, shelfModalVisible, pathModalVisible, binModalVisible, treeData,
    wrhs, zones, batchCreatePathProcessModal, batchCreateShelfProcessModal, batchCreateBinProcessModal, pathNext,
    shelfNext, binNext, pathEntitys, shelfEntitys, binEntitys, binTypes, deleteBinEntitys, batchDeleteBinProcessModal, binTypeList,
    binTypeModalVisible, pagination, searchExpand, closeWrhModalVisible, releaseWrhModalVisible,showStockInfoPage,
    binStockInfos
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
          note: data.remark
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideWrhModal'
      });
    },
  };

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
          wrhUuid: data.wrh
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideZoneModal'
      });
    },
  };

  const CloseWrhModalProps = {
    visible: closeWrhModalVisible,
    wrhs: wrhs,
    onOk(data) {
      dispatch({
        type: 'bin/closeWrh',
        payload: {
          wrhUuid: data.wrh,
          binScope: data.binScope
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideCloseWrhModal'
      });
    },
  };

  const ReleaseWrhModalProps = {
    visible: releaseWrhModalVisible,
    wrhs: wrhs,
    onOk(data) {
      dispatch({
        type: 'bin/releaseWrh',
        payload: {
          wrhUuid: data.wrh,
          binScope: data.binScope
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideReleaseWrhModal'
      });
    },
  };

  const CreatePathModalProps = {
    visible: pathModalVisible,
    zones: zones,
    onOk(data) {
      dispatch({
        type: 'bin/batchSavePath',
        payload: {
          pathEntitys: data
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hidePathModal'
      });
    },
  };

  const CreateShelfModalProps = {
    visible: shelfModalVisible,
    treeData: treeData,
    onOk(data) {
      dispatch({
        type: 'bin/batchSaveShelf',
        payload: {
          shelfEntitys: data
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideShelfModal'
      });
    },
  };

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
      });
    },
    onCancel() {
      dispatch({
        type: 'bin/hideBinModal'
      });
    },
  };

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
          zoneUuid: entity
        }
      });
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hidePathModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin'
      });
    },
  };

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
          pathCode: entity
        }
      });
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideShelfModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin',
      });
    },
  };

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
          code: entity.code
        }
      });
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideBinModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin'
      });
    },
  };

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
          version: entity.version
        }
      });
    },
    hideConfirmModal() {
      dispatch({
        type: 'bin/hideDeleteBinModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'bin/queryBin'
      });
    },
  };

  const binSearchFormProps = {
    list: list,
    field,
    keyword,
    searchExpand,
    onSearch(fieldsValue) {
      dispatch(routerRedux.push(
        {
          pathname: '/basicInfo/bin',
          query: {
            ...fieldsValue
          }
        }
      ));
    },
  };

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
      };
      dispatch({
        type: 'bin/queryBin',
        payload: {
          wrhUuid: wrhUuid,
          zoneUuid: zoneUuid,
          pathUuid: pathUuid,
          shelfUuid: shelfUuid
        }
      });
    }
  };

  const binSearchProps = {
    dataSource: list,
    pagination: pagination,
    onPageChange(page, filters, sorter) {
      dispatch(routerRedux.push(
        {
          pathname: '/basicInfo/bin',
          query: {
            ...location.query,
            page: page.current,
            pageSize: page.pageSize,
            sort: sorter.columnKey,
            order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
          }
        }
      )
      );
    },
    onShowStock(record) {
      dispatch({
        type: 'bin/queryBinStock',
        payload: record
      });
    },
    onCreateWrh() {
      dispatch({
        type: 'bin/showWrhModal'
      });
    },
    onCreateZone() {
      dispatch({
        type: 'bin/queryWrhsAndShowZoneModal'
      });
    },
    onCloseWrh() {
      dispatch({
        type: 'bin/queryWrhAndShowCloseWrhModal'
      });
    },
    onReleaseWrh() {
      dispatch({
        type: 'bin/queryWrhAndShowReleaseWrhModal'
      });
    },
    onCreateShelf() {
      dispatch({
        type: 'bin/showShelfModal'
      });
    },
    onCreatePath() {
      dispatch({
        type: 'bin/queryZonesAndShowPathModal'
      });
    },
    onCreateBin() {
      dispatch({
        type: 'bin/queryBinTypesAndShowBinModal'
      });
    },
    onDeleteBin(data) {
      dispatch({
        type: 'bin/batchDeleteBin',
        payload: {
          deleteBinEntitys: data
        }
      });
    },
    onCreateBinType() {
      dispatch({
        type: 'bin/queryBinType'
      });
    }
  };

  const binTypeModalProps = {
    dataSource: binTypeList,
    visible: binTypeModalVisible,
    onCancel() {
      dispatch({
        type: 'bin/hideBinTypeModal'
      });
    },
    onEdit(record) {
      record.editable = true;
      dispatch({
        type: 'bin/queryBinTypeSuccess',
        payload: record
      });
    },
    onCancelEdit(record) {
      record.editable = false;
      if (!record.uuid) {
        dispatch({
          type: 'bin/queryBinType'
        });
      }
      else {
        dispatch({
          type: 'bin/queryBinTypeSuccess',
          payload: record
        });
      };
    },
    onAdd() {
      dispatch({
        type: 'bin/addBinTypeLine'
      });
    },
    onDelete(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'bin/queryBinType'
        });
      else
        dispatch({
          type: 'bin/deleteBinType',
          payload: record
        });
    },
    onSave(record) {
      if (record.code == null || record.code == '') {
        message.error("代码不能为空", 2);
        return;
      } else if (/^[0-9A-Za-z]{0,6}$/.test(record.code) == false) {
        message.error("代码最大长度是6且只能为数字字母组合", 2);
        return;
      };
      if (record.name == null || record.name == '') {
        message.error("名称不能为空", 2);
        return;
      } else if (record.name.length > 100) {
        message.error("名称最大长度是100！", 2);
        return;
      };
      if (record.length == null || record.length == '') {
        message.error("长度不能为空", 2);
        return;
      };
      if (record.width == null || record.width == '') {
        message.error("宽度不能为空", 2);
        return;
      };
      if (record.height == null || record.height == '') {
        message.error("高度不能为空", 2);
        return;
      };
      if (record.plotRatio == null || record.plotRatio == '') {
        message.error("容积率不能为空", 2);
        return;
      } else if (record.plotRatio > 100 || record.plotRatio <= 0) {
        message.error("容积率不能大于100且不能小于等于0");
        return;
      };
      if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.bearing) == false) {
        message.error("承重输入不正确，最大长度12，保留三位小数");
        return;
      };
      if (record.uuid === undefined)
        dispatch({
          type: 'bin/saveNewBinType',
          payload: record
        });
      else
        dispatch({
          type: 'bin/saveModifyBinType',
          payload: record
        });
    }
  };

  const binStockInfoProps = {
    dataSource: binStockInfos,
    onViewArticle(record) {
      dispatch(
        {
          type: 'bin/toViewArticle',
          payload: record
        }
      );
    }
  };

  const CreateWrhModalGen = () =>
    <CreateWrhModal {...CreateWrhModalProps} />;
  const CreateZoneModalGen = () =>
    <CreateZoneModal {...CreateZoneModalProps} />;
  const CreateShelfModalGen = () =>
    <CreateShelfModal {...CreateShelfModalProps} />;
  const CreatePathModalGen = () =>
    <CreatePathModal {...CreatePathModalProps} />;
  const CreateBinModalGen = () =>
    <CreateBinModal {...CreateBinModalProps} />;
  const CloseWrhModalGen = () =>
    <CloseWrhModal {...CloseWrhModalProps} />;
  const ReleaseWrhModalGen = () =>
    <ReleaseWrhModal {...ReleaseWrhModalProps} />;

  if (showStockInfoPage == false) {
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
            <CloseWrhModalGen />
            <ReleaseWrhModalGen />
            <BinTypeModal {...binTypeModalProps} />
            <WMSProgress {...batchProcessPathModalProps} />
            <WMSProgress {...batchProcessShelfModalProps} />
            <WMSProgress {...batchProcessBinModalProps} />
            <WMSProgress {...batchProcessDeleteBinModalProps} />
          </Content>
        </Layout>
      </div>
    );
  }

  else return (
    <div>
      <BinStockInfo {...binStockInfoProps} />
    </div>
  );
};

Bin.propTypes = {
  bin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ bin }) {
  return { bin };
};

export default connect(mapStateToProps)(Bin);