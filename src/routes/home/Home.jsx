import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';
import HomeP from '../../components/home/Home';

function Home({ location, dispatch, home }) {

  function refreshWidget() {
      return (<HomeP />);
  };
  
  return (
    <div className="content-inner">
      {refreshWidget()}
    </div>
  );
};

export default Home;