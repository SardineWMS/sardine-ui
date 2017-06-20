import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CategorySearch from '../../components/BasicInfo/Category/CategorySearch';
import CategoryModal from '../../components/BasicInfo/Category/CategoryModal';

function Category({ location, dispatch, category }) {
  const {
    list, total, current, currentItem, modalVisible, modalType, modalShowUpper, pagination
    } = category;

  const categoryModalProps = {
    item: modalType === 'update' ? currentItem : {},
    upperCategory: currentItem,
    showUpper: modalType === 'create' ? true : false,
    visible: modalVisible,
    onOk(data) {
      data.token = localStorage.getItem("token");
      dispatch({
        type: `category/${modalType}`,
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'category/hideModal'
      });
    }
  };

  const categorySearchProps = {
    dataSource: list,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/wms/basicInfo/category',
      }));
    },
    onCreate() {
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'createRoot',
          showUpper: false,
          upperCategory: ''
        }
      });
    },
    onCreateLower(item) {
      item.token = localStorage.getItem("token");
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'create',
          currentItem: item
        }
      });
    },
    onDeleteItem(item) {
      let token = localStorage.getItem("token");
      dispatch({
        type: 'category/remove',
        payload: {
          uuid: item.uuid,
          version: item.version,
          token: token
        }
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      });
    }
  };

  const CategoryModalGen = () =>
    <CategoryModal {...categoryModalProps} />;

  return (
    <div className="content-inner">
      <CategorySearch {...categorySearchProps} />
      <CategoryModalGen />
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ category }) {
  return {
    category
  };
};

export default connect(mapStateToProps)(Category);
