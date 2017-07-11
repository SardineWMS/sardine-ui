import React, {PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Icon, Popover, Button, Badge, Modal, Tabs } from 'antd';
import styles from '../less/main.less';
import { config } from '../../utils';
import MessageModal from '../system/MessageModal';
const TabPane = Tabs.TabPane;
let pathSet = [{}];
// const menu = localStorage.getItem("ownedMenus");
// const topMenus = menu ? eval('(' + menu + ')') : [];
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/';
  menuArray.map(item => {
    pathSet[(parentPath + item.code).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.code,
      name: item.name,
      // icon: item.icon || '',
      clickable: item.clickable == undefined ? true : false
    };
    if (!!item.children && item.children.length > 0) {
      getPathSet(item.children, parentPath + item.code + '/');
    };
  });
};

const getHelpContent = function (content) {
  if (content == undefined || content == '')
    return <div />;
  var strs = new Array(); //定义一数组 
  strs = content.split(";;"); //字符分割 
  var pArray = new Array();
  for (let i = 0; i < strs.length; i++) {
    pArray.push(<p>{strs[i]}</p>); //分割后的字符输出 
  };
  return (
    <div>
      {pArray}
    </div>
  );
};

function Bread({ location, menu, onClickMessage }) {
  let pathNames = [];
  getPathSet(menu ? eval('(' + menu + ')') : []);
  pathSet['Home'] = {
    path: '/',
    name: '主页',
    clickable: false
  };
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + '-' + item).hyphenToHump());
    } else {
      pathNames.push(('-' + item).hyphenToHump());
    };
  });
  const breads = pathNames.map((item, key) => {
    return (
      <Breadcrumb.Item key={key}>
        {pathSet[item].icon
          ? <Icon type={pathSet[item].icon} />
          : ''}
        <span className={styles.breadFont}>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    );
  });

  const messageModalTitle =  <span>&nbsp;&nbsp;消息</span>;
  const messageConent = <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
            <TabPane tab="系统消息" key="1">Content of tab 1</TabPane>
            <TabPane tab="仓库消息" key="2">Content of tab 2</TabPane>
            <TabPane tab="推荐消息" key="3">Content of tab 3</TabPane>
          </Tabs>;
  const clickMessage = () => {
    onClickMessage();
    
    // Modal.info({
    //   title: messageModalTitle,
    //   content: messageConent,
    // });
  };

  return (
    <div className={styles.bread}>
      <Breadcrumb style={{ width: 300 }} key="bread">
        {breads}
      </Breadcrumb>
      
      <p>
          <Badge count={250}>
            <a onClick={clickMessage}><Icon type="message" style={{ lineHeight: 3 }} /> 消息 </a>
          </Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a><Icon type="upload" style={{ lineHeight: 3 }} /> 意见反馈 </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popover content={getHelpContent(localStorage.getItem("help_content"))} title={localStorage.getItem("help_title")} key="help">
            <a><Icon type="question-circle" style={{ lineHeight: 3 }} /> 帮助 </a>
          </Popover>
      </p>
    </div>
  );
}; 

Bread.propTypes = {
  location: PropTypes.object
};

export default Bread;
