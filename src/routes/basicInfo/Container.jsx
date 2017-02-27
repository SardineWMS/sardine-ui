import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ContainerSearch from '../../components/BasicInfo/Container/ContainerSearch';
import ContainerModal from '../../components/BasicInfo/Container/ContainerModal';
import WMSProgress from '../../components/BasicInfo/Container/WMSProgress';

function Container({loading, location, dispatch, container }) {
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
    } = container;

  const containerModalProps = {
    type: modalType,
    visible: modalVisible,
    containerTypes : containerTypes,
    onOk(data) {
      let array =new Array();  
      for(let i=0;i<data.count;i++) { 
         array[i]= i; 
      }
      dispatch({
        type : 'container/confirmSaveNew',
        payload :{
          entitys : array,
          containerTypeUuid : data.containerType,
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
    pagination:pagination,
    loading,
    searchExpand,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/wms/basicInfo/container',
        query: {
          page:page.current,
          pageSize:page.pageSize
        },
      }))
    },
    onCreate(){
      dispatch({
        type: 'container/queryContainerType',
        payload: {
          modalType: 'create',
          token : localStorage.getItem("token")
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
        payload : {
          searchExpand :!expand,
        } 
      })
    },
  }

  const batchProcessModalProps = {
    showConfirmModal: batchProcessModal,
    records: entitys,
    next:next,
    batchProcess(){
      dispatch({
        type: 'container/createContainer',
        payload : {
          containerTypeUuid : containerTypeUuid,
          token : localStorage.getItem("token")
        } 
      })
    },
    refreshGrid(){
      dispatch({
        type: 'container/query',
      })
    },
  }

  const ContainerModalGen = () =>
    <ContainerModal {...containerModalProps} />

  return (
    <div className="content-inner">
      <ContainerSearch {...containerSearchProps} />
      <ContainerModalGen />
      <WMSProgress {...batchProcessModalProps}/>
    </div>
  )
}

Container.propTypes = {
  container: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({loading, container}) {
    return {
        loading: loading.global,
        container,
    };
}

export default connect(mapStateToProps)(Container)
