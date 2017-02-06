import React ,{PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import SupplierSearchForm from '../../components/BasicInfo/Supplier/SupplierSearchForm';
import SupplierSearchGrid from '../../components/BasicInfo/Supplier/SupplierSearchGrid';
import SupplierView from '../../components/BasicInfo/Supplier/SupplierView';
import SupplierCreate from '../../components/BasicInfo/Supplier/SupplierCreate';

function Supplier({location,dispatch,supplier}){
 const{
    loading,
    list,
    total,
    current,
    token,
    pagination,
    currentItem,
    showCreate,
    showView,
    searchExpand
  }= supplier

  const {field,keyword}=location.query;

  const supplierSearchGridProps={
    dataSource:list,
    loading,
    pagination:pagination,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/wms/basicInfo/supplier',
        query:{
          page:page.current,
          pageSize:page.pageSize
        },
      }))
    },

    onCreate(){
      dispatch({
        type:'supplier/showCreatePage',
        payload : {
          currentItem : null
        }
      })
    },

    onDelete(items){
        console.log("开始删除"+items)
        items.map((e, key) => {
          console.log("e="+e+"...key="+key)
          dispatch({
            type: 'supplier/remove',
            payload: e,
          });
        })
    },

    onViewItem(item){
      dispatch({
        type:'supplier/showViewPage',
        payload:{
          currentItem:item
        }
      })
    },

    onDeleteItem(id) {
      dispatch({
        type: 'supplier/remove',
        payload: id,
      });
    },

    onEditItem(item) {
        dispatch({
        type: 'supplier/showEditPage',
        payload : {
          currentItem : item
        }
      })
    },

  }

  const supplierSearchFormProps={
    field,
    keyword,
    token,
    searchExpand,
    onSearch(fieldsValue){
      dispatch({
        type:'supplier/query',  //根据这个路径 找modes的effects中对应的方法
        payload:fieldsValue
      })
    },
      onToggle(expand) {
      dispatch({
        type: 'supplier/toggle',
        payload : {
          searchExpand :!expand,
        } 
      })
      },
  }

  const viewFormProps = {
      item: currentItem,
      onCreate() {
      dispatch({
        type: 'supplier/showCreatePage'
      })
      },
      onEdit(item) {
        dispatch({
        type: 'supplier/showEditPage',
        payload : {
          currentItem : item
        }
      })
      },
      onBack() {
        dispatch({
          type: 'supplier/backSearch',
        });
      },
     onDelete(item) {
      dispatch({
        type: 'supplier/remove',
        payload: item,
      });
    },
  }

  const createFormProps = {
    item : currentItem,
      onOk(data) {
        console.log(data);
        if(data.uuid)
        {
          dispatch({
            type: 'supplier/edit',
          payload: data,
          });
        }else{
          dispatch({
            type: 'supplier/create',
          payload: data,
          });
        }
      },
      onCancel() {
        dispatch({
          type: 'supplier/backSearch',
        });
      },
    }


  function refreshWidget(){
    if(showCreate)
        return (<SupplierCreate {...createFormProps} />);
    if(showView)
        return (<SupplierView {...viewFormProps} />);
    else{
    return (
      <div>
        <SupplierSearchForm {...supplierSearchFormProps} /> 
        <SupplierSearchGrid {...supplierSearchGridProps} />
      </div>
      );
    }
  }

    return (
      <div className="content-inner">
      { refreshWidget() } 
      </div>
  )

}

Supplier.propTypes={
  supplier:PropTypes.object,
  location : PropTypes.object,
  dispatch : PropTypes.func,
  showCreate : PropTypes.bool,
  showView : PropTypes.bool,
}

function mapStateToProps({supplier}){
  return {supplier};
}
export default connect(mapStateToProps)(Supplier);

