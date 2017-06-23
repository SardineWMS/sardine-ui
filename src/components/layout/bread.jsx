import React, { PropTypes } from 'react'
import { Breadcrumb, Icon, Popover } from 'antd'
import styles from '../less/main.less'
import { config } from '../../utils'

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

function Bread({ location, menu }) {
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

  return (
    <div className={styles.bread}>
      <Breadcrumb style={{ width: 300 }}>
        {breads}
      </Breadcrumb>
      <Popover content={getHelpContent(localStorage.getItem("help_content"))} title={localStorage.getItem("help_title")}>
        <Icon type="question-circle" style={{ lineHeight: 3 }} />
      </Popover>
    </div>
  );
};

Bread.propTypes = {
  location: PropTypes.object
};

export default Bread;
