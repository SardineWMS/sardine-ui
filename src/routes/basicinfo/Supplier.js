import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import SupplierSearchForm from '../../components/BasicInfo/Supplier/SupplierSearchForm';
import SupplierSearchGrid from '../../components/BasicInfo/Supplier/SupplierSearchGrid';
import SupplierView from '../../components/BasicInfo/Supplier/SupplierView';
import SupplierCreate from '../../components/BasicInfo/Supplier/SupplierCreate';
import WMSProgress from '../../components/Widget/WMSProgress';
import EntityLogGrid from '../../components/Log/EntityLogGrid';

function Supplier({dispatch, supplier, location}) {
  const {
    list,
    total,
    current,
    pagination,
    currentItem,
    showCreate,
    showView,
    showLog,
    logList,
    batchRecoverProcessModal,
    recoverSupplierEntitys,
    batchRemoveProcessModal,
    removeSupplierEntitys,
    supplierNext
  } = supplier;

  const token = localStorage.getItem("token");
  const {field, keyword} = location.query;



  const supplierSearchGridProps = {
    dataSource: list,
    pagination: pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/wms/basicInfo/supplier',
        query: {
          page: page.current,
          pageSize: page.pageSize
        },
      }))
    },

    onCreate() {
      dispatch({
        type: 'supplier/showCreatePage',
        payload: {
          currentItem: null
        }
      })
    },

    onRemoveBatch(suppliers) {
      dispatch({
        type: 'supplier/batchRemoveSupplier',
        payload: {
          removeSupplierEntitys: suppliers
        }
      })
    },

    onRecoverBatch(suppliers) {
      dispatch({
        type: 'supplier/batchRecoverSupplier',
        payload: {
          recoverSupplierEntitys: suppliers
        }
      })
    },

    onViewItem(item) {
      dispatch({
        type: 'supplier/showViewPage',
        payload: {
          currentItem: item
        }
      })
    },

    onRemoveItem(supplier) {
      dispatch({
        type: 'supplier/remove',
        payload: {
          uuid: supplier.uuid,
          version: supplier.version,
          token: token,
        },
      });
    },

    onEditItem(item) {
      dispatch({
        type: 'supplier/showEditPage',
        payload: {
          currentItem: item
        }
      })
    },

    onRecoverItem(supplier) {
      dispatch({
        type: 'supplier/recover',
        payload: {
          uuid: supplier.uuid,
          version: supplier.version,
          token: token,
        },
      });
    },

  }

  const supplierSearchFormProps = {
    field,
    keyword,
    token,
    onSearch(fieldsValue) {
      dispatch({
        type: 'supplier/query',  //根据这个路径 找modes的effects中对应的方法
        payload: fieldsValue
      })
    },
  }

  const viewFormProps = {
    item: currentItem,
    onRecover(item) {
      dispatch({
        type: 'supplier/recover',
        payload: item,
      });
    },
    onEdit(item) {
      dispatch({
        type: 'supplier/showEditPage',
        payload: {
          currentItem: item
        }
      })
    },
    onBack() {
      dispatch({
        type: 'supplier/backSearch',
      });
    },
    onRemove(item) {
      dispatch({
        type: 'supplier/remove',
        payload: item,
      });
    },
    onViewLog(item) {
      dispatch({
        type: 'supplier/showLogPage',
        payload: {
          uuid: item.uuid
        }
      })
    },
  }

  const createFormProps = {
    item: currentItem,
    onOk(data) {
      data.token = localStorage.getItem("token");
      if (data.uuid) {
        dispatch({
          type: 'supplier/edit',
          payload: data,
        });
      } else {
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

  const batchProcessRemoveSupplierProps = {
    showConfirmModal: batchRemoveProcessModal,
    records: removeSupplierEntitys ? removeSupplierEntitys : [],
    next: supplierNext,
    actionText: '删除',
    entityCaption: '供应商',
    batchProcess(entity) {
      dispatch({
        type: 'supplier/removeBatch',
        payload: {
          uuid: entity.uuid,
          version: entity.version,
          token: localStorage.getItem("token"),
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'supplier/hideRemoveSupplierModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'supplier/query',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    }
  }

  const batchProcessRecoverSupplierProps = {
    showConfirmModal: batchRecoverProcessModal,
    records: recoverSupplierEntitys ? recoverSupplierEntitys : [],
    next: supplierNext,
    actionText: '恢复',
    entityCaption: '供应商',
    batchProcess(entity) {
      dispatch({
        type: 'supplier/recoverBatch',
        payload: {
          uuid: entity.uuid,
          version: entity.version,
          token: localStorage.getItem("token"),
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'supplier/hideRecoverSupplierModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'supplier/query',
        payload: {
          token: localStorage.getItem("token")
        }
      })
    }
  }

   const logGridProps = {
      dataSource:logList,
      pagination: pagination,
      onPageChange(page) {
      dispatch({
        type: 'supplier/queryLog',
        payload:{  
          entityUuid:currentItem.uuid
        }
      })
      },

     onBack(){
      dispatch({
        type: 'supplier/showViewPage',
      })
    }
  }


  function refreshWidget() {
    if (showCreate)
      return (<SupplierCreate {...createFormProps} />);
    if (showView)
      return (<SupplierView {...viewFormProps} />);
    if(showLog)
      return (<EntityLogGrid {...logGridProps} />);
    else {
      return (
        <div>
          <SupplierSearchForm {...supplierSearchFormProps} />
          <SupplierSearchGrid {...supplierSearchGridProps} />
          <WMSProgress {...batchProcessRemoveSupplierProps} />
          <WMSProgress {...batchProcessRecoverSupplierProps} />
        </div>
      );
    }
  }

  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  )

}

Supplier.propTypes = {
  supplier: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  showCreate: PropTypes.bool,
  showView: PropTypes.bool,
}

function mapStateToProps({supplier}) {
  return { supplier };
}
export default connect(mapStateToProps)(Supplier);

