import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';
import SupplierSearchForm from '../../components/basicinfo/Supplier/SupplierSearchForm';
import SupplierSearchGrid from '../../components/basicinfo/Supplier/SupplierSearchGrid';
import SupplierView from '../../components/basicinfo/Supplier/SupplierView';
import SupplierCreate from '../../components/basicinfo/Supplier/SupplierCreate';
import WMSProgress from '../../components/Widget/NewProgress';
import EntityLogGrid from '../../components/Log/EntityLogGrid';

function Supplier({ dispatch, supplier, location }) {
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
    searchExpand,
    batchRecoverProcessModal,
    recoverSupplierEntitys,
    batchRemoveProcessModal,
    removeSupplierEntitys,
    supplierNext
  } = supplier;

  const token = localStorage.getItem("token");
  const { field, keyword } = location.query;

  const supplierSearchGridProps = {
    dataSource: list,
    pagination: pagination,
    onPageChange(page, filters, sorter) {
      dispatch(routerRedux.push({
        pathname: '/basicInfo/supplier',
        query: {
          ...location.query,
          page: page.current,
          pageSize: page.pageSize,
          sort: sorter.columnKey,
          order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
        }
      }));
    },

    onCreate() {
      dispatch({
        type: 'supplier/showCreatePage',
        payload: {
          currentItem: {}
        }
      });
    },

    onRemoveBatch(suppliers) {
      if (suppliers.length <= 0) {
        message.warning("请选择要停用的供应商！", 2, '');
        return;
      };
      dispatch({
        type: 'supplier/batchRemoveSupplier',
        payload: {
          removeSupplierEntitys: suppliers
        }
      });
    },

    onRecoverBatch(suppliers) {
      if (suppliers.length <= 0) {
        message.warning("请选择要启用的供应商！", 2, '');
        return;
      };
      dispatch({
        type: 'supplier/batchRecoverSupplier',
        payload: {
          recoverSupplierEntitys: suppliers
        }
      });
    },

    onViewItem(item) {
      dispatch({
        type: 'supplier/showViewPage',
        payload: {
          currentItem: item
        }
      });
    },

    onRemoveItem(supplier) {
      dispatch({
        type: 'supplier/remove',
        payload: {
          uuid: supplier.uuid,
          version: supplier.version,
          token: token
        }
      });
    },

    onEditItem(item) {
      dispatch({
        type: 'supplier/showEditPage',
        payload: {
          currentItem: item
        }
      });
    },

    onRecoverItem(supplier) {
      dispatch({
        type: 'supplier/recover', //根据这个路径 找models的effects中对应的方法
        payload: {
          uuid: supplier.uuid,
          version: supplier.version,
          token: token
        }
      });
    },
  };

  const supplierSearchFormProps = {
    field,
    keyword,
    token,
    searchExpand,
    onSearch(fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/basicInfo/supplier',
        query: {
          ...fieldsValue
        }
      }));
    }
  };

  const viewFormProps = {
    item: currentItem,
    onRecover(item) {
      dispatch({
        type: 'supplier/recover',
        payload: item
      });
    },
    onEdit(item) {
      dispatch({
        type: 'supplier/showEditPage',
        payload: {
          currentItem: item
        }
      });
    },
    onBack() {
      dispatch({
        type: 'supplier/query',
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
      });
    }
  };

  const createFormProps = {
    item: currentItem,
    onOk(data) {
      data.token = localStorage.getItem("token");
      if (data.uuid) {
        dispatch({
          type: 'supplier/edit',
          payload: data
        });
      } else {
        dispatch({
          type: 'supplier/create',
          payload: data
        });
      };
    },
    onCancel() {
      dispatch({
        type: 'supplier/backSearch'
      });
    }
  };

  const batchProcessRemoveSupplierProps = {
    showConfirmModal: batchRemoveProcessModal,
    records: removeSupplierEntitys ? removeSupplierEntitys : [],
    next: supplierNext,
    actionText: '停用',
    entityCaption: '供应商',
    url: '/swms/basicinfo/supplier/remove',
    canSkipState: 'remove',
    // batchProcess(entity) {
    //   dispatch({
    //     type: 'supplier/removeBatch',
    //     payload: {
    //       uuid: entity.uuid,
    //       version: entity.version,
    //       token: localStorage.getItem("token")
    //     }
    //   });
    // },
    hideConfirmModal() {
      dispatch({
        type: 'supplier/hideRemoveSupplierModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'supplier/query',
        payload: {
          token: localStorage.getItem("token")
        }
      });
    }
  };

  const batchProcessRecoverSupplierProps = {
    showConfirmModal: batchRecoverProcessModal,
    records: recoverSupplierEntitys ? recoverSupplierEntitys : [],
    next: supplierNext,
    actionText: '启用',
    entityCaption: '供应商',
    url: '/swms/basicinfo/supplier/recover',
    canSkipState: 'recover',
    // batchProcess(entity) {
    //   dispatch({
    //     type: 'supplier/recoverBatch',
    //     payload: {
    //       uuid: entity.uuid,
    //       version: entity.version,
    //       token: localStorage.getItem("token")
    //     }
    //   });
    // },
    hideConfirmModal() {
      dispatch({
        type: 'supplier/hideRecoverSupplierModal'
      });
    },
    refreshGrid() {
      dispatch({
        type: 'supplier/query',
        payload: {
          token: localStorage.getItem("token")
        }
      });
    }
  };

  const logGridProps = {
    dataSource: logList,
    pagination: pagination,
    onPageChange(page) {
      dispatch({
        type: 'supplier/queryLog',
        payload: {
          entityUuid: currentItem.uuid
        }
      });
    },

    onBack() {
      dispatch({
        type: 'supplier/showViewPage'
      });
    }
  };

  const SupplierSearchGridGen = () => <SupplierSearchGrid{...supplierSearchGridProps} />;

  function refreshWidget() {
    if (showCreate)
      return (<SupplierCreate {...createFormProps} />);
    if (showView)
      return (<SupplierView {...viewFormProps} />);
    if (showLog)
      return (<EntityLogGrid {...logGridProps} />);
    else {
      return (
        <div>
          <SupplierSearchForm {...supplierSearchFormProps} />
          <SupplierSearchGridGen />
          <WMSProgress {...batchProcessRemoveSupplierProps} />
          <WMSProgress {...batchProcessRecoverSupplierProps} />
        </div>
      );
    };
  };

  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  );

};

Supplier.propTypes = {
  supplier: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  showCreate: PropTypes.bool,
  showView: PropTypes.bool
};

function mapStateToProps({ supplier }) {
  return { supplier };
};
export default connect(mapStateToProps)(Supplier);

