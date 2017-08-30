import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ContainerSearch from '../../components/BasicInfo/Container/ContainerSearch';
import ContainerModal from '../../components/BasicInfo/Container/ContainerModal';
import WMSProgress from '../../components/BasicInfo/Container/WMSProgress';
import ContainerTypeModal from '../../components/BasicInfo/Container/ContainerTypeModal';
import ContainerStockInfo from '../../components/basicinfo/container/ContainerStockInfo';
import { message } from 'antd';

function Container({ location, dispatch, container }) {
  const {
    list,
    pagination,
    searchExpand,
    containerTypes,
    containerTypeUuid,
    batchProcessModal,
    next,
    entitys,
    currentItem,
    modalVisible,
    modalType,
    containerTypeList,
    containerTypeModalVisible,
    showStockInfoPage,
    containerStockInfos
    } = container;

  const containerModalProps = {
    type: modalType,
    visible: modalVisible,
    containerTypes: containerTypes,
    onOk(data) {
      let array = new Array();
      for (let i = 0; i < data.count; i++) {
        array[i] = i;
      };
      dispatch({
        type: 'container/confirmSaveNew',
        payload: {
          entitys: array,
          containerTypeUuid: data.containerType
        }
      });
    },
    onCancel() {
      dispatch({
        type: 'container/hideModal'
      });
    },
  };

  const containerSearchProps = {
    dataSource: list,
    pagination: pagination,
    searchExpand,
    onPageChange(page, filters, sorter) {
      dispatch({
        type: 'container/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          sort: sorter.columnKey,
          order: (sorter.order && sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
        },
      })
    },
    onCreate() {
      dispatch({
        type: 'container/queryContainerType',
        payload: {
          modalType: 'create'
        }
      });
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'container/query',
        payload: fieldsValue
      });
    },
    onToggle(expand) {
      dispatch({
        type: 'container/toggle',
        payload: {
          searchExpand: !expand
        }
      });
    },
    onCreateContainerType() {
      dispatch({
        type: 'container/createType',
        payload: {}
      });
    },
    onQueryStock(record) {
      dispatch({
        type: 'container/queryContainerStock',
        payload: record
      });
    }
  };

  const batchProcessModalProps = {
    showConfirmModal: batchProcessModal,
    records: entitys,
    next: next,
    batchProcess() {
      dispatch({
        type: 'container/createContainer',
        payload: {
          containerTypeUuid: containerTypeUuid,
          token: localStorage.getItem("token")
        }
      });
    },
    refreshGrid() {
      dispatch({
        type: 'container/query',
      });
    }
  };

  const containerTypeModalProps = {
    dataSource: containerTypeList,
    visible: containerTypeModalVisible,
    onCancel() {
      dispatch({
        type: 'container/hideContainerTypeModal'
      });
    },
    onEdit(record) {
      record.editable = true;
      dispatch({
        type: 'container/showContainerTypeSuccess',
        payload: record
      });
    },
    onCancelEdit(record) {
      record.editable = false;
      if (!record.uuid) {
        dispatch({
          type: 'container/queryContainerType'
        });
      } else {
        dispatch({
          type: 'container/showContainerTypeSuccess',
          payload: record
        });
      };
    },
    onAdd() {
      dispatch({
        type: 'container/addContainerTypeLine'
      });
    },
    onDelete(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'container/queryContainerType'
        });
      else
        dispatch({
          type: 'container/deleteContainerType',
          payload: record
        });
    },
    onSave(record) {
      if (record.code == null || record.code == '') {
        message.error("代码不能为空", 2);
        return;
      } else if (record.code.length > 30) {
        message.error("代码最大长度是30！", 2);
        return;
      };
      if (record.name == null || record.name == '') {
        message.error("名称不能为空", 2);
        return;
      } else if (record.name.length > 100) {
        message.error("名称最大长度是100！", 2);
        return;
      };
      if ((record.barCodePrefix != null || record.barCodePrefix != '') && record.barCodePrefix.length > 30) {
        message.error("前缀最大长度是32！", 2);
        return;
      };
      if ((record.barCodeLength != null || record.barCodeLength != '') && /^[1-9][0-9]$|^[0-9]$/.test(record.barCodeLength) == false) {
        message.error("长度只能是1位或2位数字！", 2);
        return;
      };
      if ((record.weight != null || record.weight != '') && /^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.weight) == false) {
        message.error("自重输入不正确，最大长度12，保留三位小数！", 2);
        return;
      };
      if ((record.bearingWeight != null || record.bearingWeight != '') && /^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.bearingWeight) == false) {
        message.error("承重输入不正确，最大长度12，保留三位小数！", 2);
        return;
      };
      if (record.uuid === undefined)
        dispatch({
          type: 'container/saveNewContainerType',
          payload: record
        });
      else
        dispatch({
          type: 'container/saveModifyContainerType',
          payload: record
        });
    }
  };

  const containerStockInfoProps = {
    dataSource: containerStockInfos,
    onViewArticle(record) {
      dispatch({
        type: 'container/toViewArticle',
        payload: record
      });
    }
  };

  const ContainerModalGen = () =>
    <ContainerModal {...containerModalProps} />;
  if (showStockInfoPage == false)
    return (
      <div className="content-inner">
        <ContainerSearch {...containerSearchProps} />
        <ContainerTypeModal {...containerTypeModalProps} />
        <ContainerModalGen />
        <WMSProgress {...batchProcessModalProps} />


      </div>
    );
  else return (
    <div>
      <ContainerStockInfo {...containerStockInfoProps} />
    </div>
  );
};

Container.propTypes = {
  container: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ container }) {
  return {
    container
  };
};

export default connect(mapStateToProps)(Container);
