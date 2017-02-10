import React ,{PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ContainerTypeSearchForm from '../../components/BasicInfo/ContainerType/ContainerTypeSearchForm';
import ContainerTypeSearchGrid from '../../components/BasicInfo/ContainerType/ContainerTypeSearchGrid';
import ContainerTypeModal from '../../components/BasicInfo/ContainerType/ContainerTypeModal';


function ContainerType({location,dispatch,containerType}){
 const{
    loading,
    list,
    total,
    current,
    token,
    pagination,
    currentItem,
    modalType,
    modalVisible
  }= containerType;

  const {field,keyword}=location.query;

  const containerTypeModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType: modalType,
    visible: modalVisible,
    onOk(data) {
      console.log(data),
      dispatch({
        type: `containerType/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'containerType/hideModal',
      })
    },
  }


  const containerTypeSearchGridProps={
    dataSource:list,
    loading,
    pagination:pagination,
    item: currentItem,

    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/wms/basicInfo/containerType',
        query:{
          page:page.current,
          pageSize:page.pageSize
        },
      }))
    },

    onCreate(){
        dispatch({
        type: `containerType/get`,
        payload: data,
      })
    },

  onViewItem(test){
    dispatch({
        type: `containerType/get`,
        payload: {
          uuid:test.uuid,
          modalType:'view'
        }
    })
  },

    onDeleteItem(id) {
      dispatch({
        type: 'containerType/remove',
        payload: id,
      });
    },

  onEditItem(test){
    dispatch({
        type: `containerType/get`,
        payload: {
          uuid:test.uuid,
          modalType:'edit'
        }
    })
  },

    // onEditItem(item) {
    //     console.log(item),
    //     dispatch({
    //     type: 'containerType/showModal',
    //     payload : {
    //       currentItem : item,
    //       modalType:'edit'
    //     }
    //   })
    // },

  }

  const containerTypeSearchFormProps={
    token,
    onSearch(fieldsValue){
      dispatch({
        type:'containerType/query',  //根据这个路径 找modes的effects中对应的方法
        payload:fieldsValue
      })
    }
  }

  function refreshWidget(){
    return (
      <div>
        <ContainerTypeSearchForm {...containerTypeSearchFormProps} /> 
        <ContainerTypeSearchGrid {...containerTypeSearchGridProps} />
        <ContainerTypeModal {...containerTypeModalProps}/>
      </div>
      );
  }

  return (
      <div className="content-inner">
      { refreshWidget() } 
      </div>
  )

}

ContainerType.propTypes={
  containerType:PropTypes.object,
  location : PropTypes.object,
  dispatch : PropTypes.func,
  showCreate : PropTypes.bool,
  showView : PropTypes.bool,
}

function mapStateToProps({containerType}){
  return {containerType};
}
export default connect(mapStateToProps)(ContainerType);

