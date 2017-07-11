import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'dva';
import CreateDCModal from '../../components/system/CreateDCModal';
import WrhManage from '../../components/system/WrhManage';
import styles from '../../components/less/main.less';
import guid from '../../utils/Guid';
import {
  Spin,
  message
} from 'antd'
import {
  classnames
} from '../../utils'

function System({
  location,
  dispatch,
  dc,
  loading
}) {
  const {
    creatingButtonLoading, wareHouses, showCreate, defaultActiveKey, visible, wareHouse, title
  } = dc;

  const createDcProps = {
    loading: loading,
    visible: visible,
    wareHouse: wareHouse,
    key: wareHouse ? wareHouse.uuid : '',
    title: title,
    onOk(data) {
      dispatch({
        type: 'dc/create',
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'dc/hideCreate'
      });
    }
  };

  const wareHousesManageProps = {
     wareHouses: wareHouses,
     defaultActiveKey: defaultActiveKey,
     onCreate() {
      dispatch({
        type: 'dc/showCreate',
        payload: {
          wareHouse: {},
          title: '创建仓库'
        }
      });
     },

     onEdit(wareHouse) {
      dispatch({
        type: 'dc/showCreate',
        payload: {
          wareHouse: wareHouse,
          title: '编辑仓库'
        }
      });
     }
  };


  localStorage.setItem("help_title", "帮助");
  localStorage.setItem("help_content", "显示当前企业下所有仓库");

  return (
    <div className="content-inner">
      <WrhManage {...wareHousesManageProps} />
      <CreateDCModal {...createDcProps} />
    </div>
  );
};

System.propTypes = {
  creatingButtonLoading: PropTypes.bool,
  wareHouses: PropTypes.array
};

function mapStateToProps({ loading, dc }) {
  return {
    loading: loading.global,
    dc
  };
};

export default connect(mapStateToProps)(System);