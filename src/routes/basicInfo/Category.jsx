import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CategorySearch from '../../components/BasicInfo/Category/CategorySearch';
import CategoryModal from '../../components/BasicInfo/Category/CategoryModal';

function Category({ location, dispatch, category }) {
  const {
    loading, list, total, current, currentItem, modalVisible, modalType,modalShowUpper, pagination,
    } = category;

  const { field, keyword } = location.query

  const categoryModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    upperCategory :  currentItem.categoryCode,
    type: modalType,
    showUpper : modalType === 'create' ? true : false,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `category/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'category/hideModal',
      })
    },
  }

  const categorySearchProps = {
    dataSource: list,
    pagination:pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/category',
        query: {
          page:page.current,
          pageSize:page.pageSize
        },
      }))
    },
    onCreate(){
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'createRoot',
          showUpper : false,
          upperCategory : '',
        },
      })
    },
    onCreateLower(item){
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'create',
          currentItem : item,
        },
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'category/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'category/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const CategoryModalGen = () =>
    <CategoryModal {...categoryModalProps} />

  return (
    <div className="content-inner">
      <CategorySearch {...categorySearchProps} />
      <CategoryModalGen />
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({ category }) {
  return { category }
}

export default connect(mapStateToProps)(Category)
