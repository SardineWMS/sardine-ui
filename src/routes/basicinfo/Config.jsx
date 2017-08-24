import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;
import { connect } from 'dva';
import { message } from 'antd';
import WMSProgress from '../../components/Widget/WMSProgress';
import ConfigTree from '../../components/basicinfo/config/ConfigTree';
import ArticleConfigSearchForm from '../../components/basicinfo/config/articleconfig/ArticleConfigSearchForm';
import ArticleConfigSearchGrid from '../../components/basicinfo/config/articleconfig/ArticleConfigSearchGrid';
import CategoryStorageAreaConfigSearchGrid from '../../components/basicinfo/config/categorystorageareaconfig/CategoryStorageAreaConfigSearchGrid';
import CategoryStorageAreaConfigSearchForm from '../../components/basicinfo/config/categorystorageareaconfig/CategoryStorageAreaConfigSearchForm';
import PickAreaStorageAreaConfigSearchForm from '../../components/basicinfo/config/pickareastorageareaconfig/PickAreaStorageAreaConfigSearchForm';
import PickAreaStorageAreaConfigSearchGrid from '../../components/basicinfo/config/pickareastorageareaconfig/PickAreaStorageAreaConfigSearchGrid';
import TaskAreaConfigSearchForm from '../../components/basicinfo/config/taskAreaConfig/TaskAreaConfigSearchForm';
import TaskAreaConfigSearchGrid from '../../components/basicinfo/config/taskAreaConfig/TaskAreaConfigSearchGrid';
import BinScopeModal from '../../components/basicinfo/config/BinScopeModal';
import PickBinStockLimitModal from '../../components/basicinfo/config/articleconfig/PickBinStockLimitModal';
import OperatorModal from '../../components/basicinfo/config/taskAreaConfig/OperatorModal';
import TaskAreaConfigModal from '../../components/basicinfo/config/taskAreaConfig/TaskAreaConfigModal';
import ReasonConfigForm from '../../components/basicinfo/config/reasonconfig/ReasonConfigForm';

function Config({ location, dispatch, config }) {
  const {
      showPage,
      treeData,
      binScopeModalVisible,
      binScopeType,
      pickBinStockLimitModalVisible,
      articleConfigs,
      articlePagination,
      batchSetArticleFixedPickBinModal,
      batchSetArticleStorageAreaModal,
      batchSetPickBinStockLimitModal,
      selectedArticleConfigs,
      articleConfigNext,
      categoryStorageAreaConfigs,
      categoryStorageAreaPagination,
      selectedCategoryStorageAreaConfigs,
      categoryStorageAreaConfigNext,
      batchSetCategoryStorageAreaModal,
      pickAreaStorageAreaConfigs,
      pickAreaStorageAreaPagination,
      selectedPickAreaStorageAreaConfigs,
      batchSetPickAreaStorageAreaModal,
      pickAreaStorageAreaConfigNext,
      taskAreaConfigs,
      taskAreaPagination,
      taskAreaConfigModalVisible,
      operatorModalVisible,
      operators,
      operatorPagination,
      currentTaskAreaConfig,
      currentOperator,
      reasons,
      reasonType 
    } = config;

  const { field, keyword } = location.query

  const configTreeProps = {
    onSelect(selectKeys) {
      if (selectKeys == '0002080101') {
          dispatch({
             type: 'config/queryArticleConfigByPage'
          })      
      } else if(selectKeys == '0002080102') {
          dispatch({
             type: 'config/queryCategoryStorageAreaConfigByPage'
          })    
      } else if(selectKeys == '0002080103') {
          dispatch({
             type: 'config/queryPickAreaStorageAreaConfigByPage'
          })    
      }else if(selectKeys == '0002080301') {
          dispatch({
             type: 'config/queryTaskAreaConfigByPage'
          })    
      }else if(selectKeys == '0002080201') {
          dispatch({
             type: 'config/queryReasonConfig',
             payload: {
                reasonType:"DECINC"
             }
          })    
      }else if(selectKeys == '0002080202') {
          dispatch({
             type: 'config/queryReasonConfig',
             payload: {
                reasonType:"MOVE"
             }
          })    
      }
    }
  }

  const articleConfigSearchFormProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'config/queryArticleConfigByPage',  
        payload: fieldsValue
      })
    },
  }


  const articleConfigSearchGridProps={
      dataSource: articleConfigs,
      pagination: articlePagination,
      onPageChange(page, filters, sorter) {
        dispatch({
          type: 'config/queryArticleConfigByPage',  
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            sort: sorter.columnKey,
            order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
          },
        })
      },
      onSetArticleFixedPickBin(articleConfigs){
        if (articleConfigs.length <= 0) {
            message.warning("请选择要设置的商品！", 2, '');
            return;
        }
        dispatch({
            type: 'config/showBinScopeModal',
            payload: {
              binScopeType: "setArticleFixedPickBin",
              selectedArticleConfigs:articleConfigs
            }
        })
      },
      onSetArticleStorageArea(articleConfigs){
       if (articleConfigs.length <= 0) {
            message.warning("请选择要设置的商品！", 2, '');
            return;
        }
        dispatch({
            type: 'config/showBinScopeModal',
            payload: {
              binScopeType: "setArticleStorageArea",
              selectedArticleConfigs:articleConfigs
            }
        })
      },
      onSetPickBinStockLimit(articleConfigs){
         if (articleConfigs.length <= 0) {
              message.warning("请选择要设置的商品！", 2, '');
              return;
          }
          dispatch({
              type: 'config/showPickBinStockLimitModal',
              payload: { 
                selectedArticleConfigs:articleConfigs
              }
          })
      }
  }

  const setArticleFixedPickBinModalProps={
      title:"设置固定拣货位",
      label:"固定拣货位",
      testValue:"test",
      visible:binScopeModalVisible,
      onOk(binScope) {
        selectedArticleConfigs.map(function (articleConfig) {
            articleConfig.fixedPickBin=binScope;
        });
        dispatch({
          type: 'config/showBatchSetArticleFixedPickBinModal',
          payload: {
            selectedArticleConfigs:selectedArticleConfigs
          }
        })
      },
      onCancel(){
        dispatch({
            type: 'config/hideBinScopeModal'
        })  
      }
  }

  const setArticleStorageAreaModalProps={
      title:"设置存储区域",
      label:"存储区域",
      visible:binScopeModalVisible,
      onOk(binScope) {
        selectedArticleConfigs.map(function (articleConfig) {
            articleConfig.storageArea=binScope;
        });
        dispatch({
          type: 'config/showBatchSetArticleStorageAreaModal',
          payload: selectedArticleConfigs
        })
      },
      onCancel(){
        dispatch({
            type: 'config/hideBinScopeModal'
        })  
      }
  }

  const batchSetArticleFixedPickBinProps = {
    showConfirmModal: batchSetArticleFixedPickBinModal,
    records: selectedArticleConfigs ? selectedArticleConfigs : [],
    next: articleConfigNext,
    actionText: '设置固定拣货位',
    entityCaption: '商品配置',
    batchProcess(entity) {
      dispatch({
        type: 'config/setArticleFixedPickBin',
        payload: {
          articleUuid: entity.article.uuid,
          fixedPickBin:entity.fixedPickBin,
          version: entity.version
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'config/hideBatchSetArticleFixedPickBinModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'config/queryArticleConfigByPage'
      })
    }
  }

  const batchSetArticleStorageAreaProps = {
    showConfirmModal: batchSetArticleStorageAreaModal,
    records: selectedArticleConfigs ? selectedArticleConfigs : [],
    next: articleConfigNext,
    actionText: '设置存储区域',
    entityCaption: '商品配置',
    batchProcess(entity) {
      dispatch({
        type: 'config/setArticleStorageArea',
        payload: {
          articleUuid: entity.article.uuid,
          storageArea:entity.storageArea,
          version: entity.version
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'config/hideBatchSetArticleStorageAreaModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'config/queryArticleConfigByPage'
      })
    }
  }

  const setPickBinStockLimitModalProps={
      visible:pickBinStockLimitModalVisible,
      onOk(pickBinStockLimit) {
        selectedArticleConfigs.map(function (articleConfig) {
            articleConfig.pickBinStockLimit=pickBinStockLimit;
        });
        dispatch({
          type: 'config/showBatchSetPickBinStockLimitModal',
          payload: selectedArticleConfigs
        })
      },
      onCancel(){
        dispatch({
            type: 'config/hidePickBinStockLimitModal'
        })  
      }
  }

  const batchSetPickBinStockLimitProps = {
    showConfirmModal: batchSetPickBinStockLimitModal,
    records: selectedArticleConfigs ? selectedArticleConfigs : [],
    next: articleConfigNext,
    actionText: '设置最高最低库存',
    entityCaption: '商品配置',
    batchProcess(entity) {
      dispatch({
        type: 'config/setPickBinStockLimit',
        payload: {
          articleUuid: entity.article.uuid,
          fixedPickBin:entity.fixedPickBin,
          version: entity.version,
          pickBinStockLimit:entity.pickBinStockLimit
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'config/hideBatchSetPickBinStockLimitModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'config/queryArticleConfigByPage'
      })
    }
  }

  const categoryStorageAreaConfigSearchFormProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'config/queryCategoryStorageAreaConfigByPage',  
        payload: fieldsValue
      })
    },
  }

  const categoryStorageAreaConfigSearchGridProps={
      dataSource: categoryStorageAreaConfigs,
      pagination: categoryStorageAreaPagination,
      onPageChange(page, filters, sorter) {
        dispatch({
          type: 'config/queryCategoryStorageAreaConfigByPage',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            sort: sorter.columnKey,
            order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
          },
        })
      },
      onSetCategoryStorageArea(categoryStorageAreaConfigs){
       if (categoryStorageAreaConfigs.length <= 0) {
            message.warning("请选择要设置的商品类别！", 2, '');
            return;
        }
        dispatch({
            type: 'config/showBinScopeModal',
            payload: {
              binScopeType: "setCategoryStorageArea",
              selectedCategoryStorageAreaConfigs:categoryStorageAreaConfigs
            }
        })
      },
  }

  const setCategoryStorageAreaModalProps={
      title:"设置存储区域",
      label:"存储区域",
      visible:binScopeModalVisible,
      onOk(binScope) {
        selectedCategoryStorageAreaConfigs.map(function (categoryStorageAreaConfig) {
            categoryStorageAreaConfig.storageArea=binScope;
        });
        dispatch({
          type: 'config/showBatchSetCategoryStorageAreaModal',
          payload: selectedCategoryStorageAreaConfigs
        })
      },
      onCancel(){
        dispatch({
            type: 'config/hideBinScopeModal'
        })  
      }
  }

  const batchCategoryStorageAreaProps = {
    showConfirmModal: batchSetCategoryStorageAreaModal,
    records: selectedCategoryStorageAreaConfigs ? selectedCategoryStorageAreaConfigs : [],
    next: categoryStorageAreaConfigNext,
    actionText: '设置存储区域',
    entityCaption: '商品类别配置',
    batchProcess(entity) {
      dispatch({
        type: 'config/setCategoryStorageArea',
        payload: {
          categoryUuid: entity.category.uuid,
          storageArea:entity.storageArea,
          version: entity.version
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'config/hideBatchSetCategoryStorageAreaModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'config/queryCategoryStorageAreaConfigByPage'
      })
    }
  }

  const pickAreaStorageAreaConfigSearchFormProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'config/queryPickAreaStorageAreaConfigByPage',  
        payload: fieldsValue
      })
    },
  }

  const pickAreaStorageAreaConfigSearchGridProps={
      dataSource: pickAreaStorageAreaConfigs,
      pagination: pickAreaStorageAreaPagination,
      onPageChange(page, filters, sorter) {
        dispatch({
          type: 'config/queryPickAreaStorageAreaConfigByPage',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            sort: sorter.columnKey,
            order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
          },
        })
      },
      onSetPickAreaStorageArea(pickAreaStorageAreaConfigs){
       if (pickAreaStorageAreaConfigs.length <= 0) {
            message.warning("请选择要设置的拣货分区！", 2, '');
            return;
        }
        dispatch({
            type: 'config/showBinScopeModal',
            payload: {
              binScopeType: "setPickAreaStorageArea",
              selectedPickAreaStorageAreaConfigs:pickAreaStorageAreaConfigs
            }
        })
      },
  }

  const setPickAreaStorageAreaModalProps={
      title:"设置存储区域",
      label:"存储区域",
      visible:binScopeModalVisible,
      onOk(binScope) {
        selectedPickAreaStorageAreaConfigs.map(function (pickAreaStorageAreaConfig) {
            pickAreaStorageAreaConfig.storageArea=binScope;
        });
        dispatch({
          type: 'config/showBatchSetPickAreaStorageAreaModal',
          payload: selectedPickAreaStorageAreaConfigs
        })
      },
      onCancel(){
        dispatch({
            type: 'config/hideBinScopeModal'
        })  
      }
  }

  const batchPickAreaStorageAreaProps = {
    showConfirmModal: batchSetPickAreaStorageAreaModal,
    records: selectedPickAreaStorageAreaConfigs ? selectedPickAreaStorageAreaConfigs : [],
    next: pickAreaStorageAreaConfigNext,
    actionText: '设置存储区域',
    entityCaption: '拣货分区配置',
    batchProcess(entity) {
      dispatch({
        type: 'config/setPickAreaStorageArea',
        payload: {
          pickAreaUuid: entity.pickArea.uuid,
          storageArea:entity.storageArea,
          version: entity.version
        }
      })
    },
    hideConfirmModal() {
      dispatch({
        type: 'config/hideBatchSetPickAreaStorageAreaModal',
      })
    },
    refreshGrid() {
      dispatch({
        type: 'config/queryPickAreaStorageAreaConfigByPage'
      })
    }
  }

   const taskAreaConfigSearchFormProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'config/queryTaskAreaConfigByPage',  
        payload: fieldsValue
      })
    },
  }

  const taskAreaConfigSearchGridProps={
      dataSource: taskAreaConfigs,
      pagination: taskAreaPagination,
      onPageChange(page, filters, sorter) {
        dispatch({
          type: 'config/queryTaskAreaConfigByPage',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
            sort: sorter.columnKey,
            order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
          },
        })
      },
      onCreate() {
        dispatch({
          type: 'config/showTaskAreaConfigModal',
          payload: {
            currentTaskAreaConfig: {}
          }
        })
      },
      onRemove(taskAreaConfig) {
        dispatch({
          type: 'config/removeTaskAreaConfig',
          payload: {
            uuid: taskAreaConfig.uuid,
            version: taskAreaConfig.version  
          },
        });
      },
      onEdit(taskAreaConfig) {
        const newTaskAreaConfig=new Object(taskAreaConfig);
        dispatch({
          type: 'config/showTaskAreaConfigModal',
          payload: {
            currentTaskAreaConfig: newTaskAreaConfig
          }
        })
      }
  }

  const setTaskAreaConfigModalProps={
      visible:taskAreaConfigModalVisible,
      taskAreaConfig:currentTaskAreaConfig,
      currentOperator:currentOperator,
      queryOperators(){
        dispatch({
            type: 'config/queryUserByPage'
        }); 
      },
      getOperator(operatorCode){
          dispatch({
            type: 'config/getOperator',
            payload: operatorCode
          })
      },
      onOk(taskAreaConfig) {
        if(taskAreaConfig.uuid){
          dispatch({
            type: 'config/updateTaskAreaConfig',
            payload: taskAreaConfig
          })
          dispatch({
            type: 'config/queryTaskAreaConfigByPage'
          })
        }else{
          dispatch({
            type: 'config/createTaskAreaConfig',
            payload: taskAreaConfig
          })
        }
      },
      onCancel(){
        dispatch({
            type: 'config/hideTaskAreaConfigModal'
        })  
      }
  }

  const operatorModalProps={
      visible:operatorModalVisible,
      operators: operators,
      operatorPagination: operatorPagination,
      onOk(users){
        if(users && users.length <= 0){
             message.warning("请选择要设置的员工！", 2, '');
            return;
        }
        const user=users[0];
        const operator=new Object();
        operator.uuid=user.uuid;
        operator.code=user.code;
        operator.name=user.name;
        dispatch({
            type: 'config/selectOperator',
            payload: operator
        })  
      },
      onCancel(){
          dispatch({
              type: 'config/hideOperatorModal'
          })  
      }
  } 

  const reasonConfigProps={
    title: reasonType==="MOVE"? "移库原因":"损溢原因",
    reasons : reasons ? (reasons.length>0 ? reasons : ['']):[''],
    onAdd(reasons){
       reasons.push('');
       dispatch({
        type: 'config/showReasonConfigByPage',
        payload: {
          reasons : reasons
        }
      })
    },
    onRemove(index,currentReasons){
       currentReasons.splice(index,1);
       dispatch({
        type: 'config/showReasonConfigByPage',
        payload: {
          reasons : currentReasons
        }
      })
    },
    setReasonConfig(reasons){
       dispatch({
        type: 'config/setReasonConfig',
        payload: {
          reasonType: reasonType,
          reasons : reasons
        }
      })
    }
  }


  return (
    <div className="content-inner">
      <Layout style={{ padding: '0 0', background: '#fff' }}>
        <Sider width={210} style={{ background: '#fff', padding: '0 5px' }}>
          <ConfigTree {...configTreeProps} />
        </Sider>
        <Content style={{ padding: '0 0 0 5px', minHeight: 280 }}>
          {
            (() => {
                  switch (showPage) {
                      case 'articleConfigPage':
                       return (
                           <div>
                                <ArticleConfigSearchForm {...articleConfigSearchFormProps} />
                                <ArticleConfigSearchGrid {...articleConfigSearchGridProps} />
                                <WMSProgress {...batchSetArticleFixedPickBinProps} />
                                <WMSProgress {...batchSetPickBinStockLimitProps} />
                                <WMSProgress {...batchSetArticleStorageAreaProps} />
                                <PickBinStockLimitModal {...setPickBinStockLimitModalProps} />
                                {"setArticleFixedPickBin"===binScopeType?
                                   <BinScopeModal {...setArticleFixedPickBinModalProps} />
                                  :
                                   <BinScopeModal {...setArticleStorageAreaModalProps} />
                                }
                           </div>
                       )
                      case 'categoryStorageAreaConfigPage':
                       return (
                           <div>
                                <CategoryStorageAreaConfigSearchForm {...categoryStorageAreaConfigSearchFormProps} />
                                <CategoryStorageAreaConfigSearchGrid {...categoryStorageAreaConfigSearchGridProps} />
                                <WMSProgress {...batchCategoryStorageAreaProps} />
                                <BinScopeModal {...setCategoryStorageAreaModalProps} />

                           </div>
                       )
                     case 'pickAreaStorageAreaConfigPage':
                       return (
                           <div>
                                <PickAreaStorageAreaConfigSearchForm {...pickAreaStorageAreaConfigSearchFormProps} />
                                <PickAreaStorageAreaConfigSearchGrid {...pickAreaStorageAreaConfigSearchGridProps} />
                                <WMSProgress {...batchPickAreaStorageAreaProps} />
                                <BinScopeModal {...setPickAreaStorageAreaModalProps} />
                           </div>
                       )
                    case 'taskAreaConfigPage':
                       return (
                           <div>
                                <TaskAreaConfigSearchForm {...taskAreaConfigSearchFormProps} />
                                <TaskAreaConfigSearchGrid {...taskAreaConfigSearchGridProps} />
                                <OperatorModal {...operatorModalProps} />
                                <TaskAreaConfigModal {...setTaskAreaConfigModalProps} />
                           </div>
                       )
                    case 'reasonConfigPage':
                       {
                         return (
                           <div>
                                <ReasonConfigForm {...reasonConfigProps} />
                           </div>
                         );
                        }  
                  }
              })()
          }
        </Content>
      </Layout>
    </div>
  )
}

Config.propTypes = {
  config: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({ config }) {
  return { config }
}

export default connect(mapStateToProps)(Config);