import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ContainerSearch from '../../components/BasicInfo/Container/ContainerSearch';
import ContainerModal from '../../components/BasicInfo/Container/ContainerModal';
import WMSProgress from '../../components/BasicInfo/Container/WMSProgress';
import ContainerTypeModal from '../../components/BasicInfo/Container/ContainerTypeModal';

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
    } = container;

  const containerModalProps = {
    type: modalType,
    visible: modalVisible,
    containerTypes: containerTypes,
    onOk(data) {
      let array = new Array();
      for (let i = 0; i < data.count; i++) {
        array[i] = i;
      }
      dispatch({
        type: 'container/confirmSaveNew',
        payload: {
          entitys: array,
          containerTypeUuid: data.containerType,
        }
      })
    },
    onCancel() {
      dispatch({
        type: 'container/hideModal',
      })
    },
  }

  const containerSearchProps = {
    dataSource: list,
    pagination: pagination,
    searchExpand,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/wms/basicInfo/container',
        query: {
          page: page.current,
          pageSize: page.pageSize
        },
      }))
    },
    onCreate() {
      dispatch({
        type: 'container/queryContainerType',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'container/query',
        payload: fieldsValue,
      })
    },
    onToggle(expand) {
      dispatch({
        type: 'container/toggle',
        payload: {
          searchExpand: !expand,
        }
      })
    },
    onCreateContainerType() {
      dispatch({
        type: 'container/createType',
        payload: {}
      })
    }
  }

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
      })
    },
    refreshGrid() {
      dispatch({
        type: 'container/query',
      })
    },
  }

  const containerTypeModalProps = {
    dataSource: containerTypeList,
    visible: containerTypeModalVisible,
    onCancel() {
      dispatch({
        type: 'container/hideContainerTypeModal',
      })
    },
    onEdit(record) {
      record.editable = true;
      dispatch({
        type: 'container/showContainerTypeSuccess',
        payload: record,
      })
    },
    onCancelEdit(record) {
      record.editable = false;
      if (!record.uuid) {
        dispatch({
          type: 'container/queryContainerType'
        })
      } else {
        dispatch({
          type: 'container/showContainerTypeSuccess',
          payload: record,
        })
      }
    },
    onAdd() {
      dispatch({
        type: 'container/addContainerTypeLine',
      })
    },
    onDelete(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'container/queryContainerType',
        })
      else
        dispatch({
          type: 'container/deleteContainerType',
          payload: record,
        })
    },
    onSave(record) {
      if (record.uuid === undefined)
        dispatch({
          type: 'container/saveNewContainerType',
          payload: record,
        })
      else
        dispatch({
          type: 'container/saveModifyContainerType',
          payload: record,
        })
    }
  }

  const ContainerModalGen = () =>
    <ContainerModal {...containerModalProps} />

  return (
    <div className="content-inner">
      <ContainerSearch {...containerSearchProps} />
      <ContainerTypeModal {...containerTypeModalProps} />
      <ContainerModalGen />
      <WMSProgress {...batchProcessModalProps} />
    </div>
  )
}

Container.propTypes = {
  container: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({ container }) {
  return {
    container,
  };
}

export default connect(mapStateToProps)(Container)
