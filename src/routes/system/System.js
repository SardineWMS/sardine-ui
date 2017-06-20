import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'dva'
import DCCreate from '../../components/system/DCCreate';
import styles from '../../components/less/main.less';
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
  system,
  loading
}) {
  const {
    creatingButtonLoading
  } = system;

  const createDcProps = {
    loading,
    creatingButtonLoading,
    onCreate(data) {
      dispatch({
        type: 'system/create',
        payload: data
      });
    }
  };

  return (
    <div>
      <div className={styles.reg}>
        <Spin spinning={loading}>
          <DCCreate {...createDcProps} />
        </Spin>
      </div>
    </div>
  );
};

System.propTypes = {
  creatingButtonLoading: PropTypes.bool
};

function mapStateToProps({ loading, system }) {
  return {
    loading: loading.global,
    system
  };
};

export default connect(mapStateToProps)(System);