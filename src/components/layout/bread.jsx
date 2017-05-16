import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from '../less/main.less'
import { config } from '../../utils'

let pathSet = [{}]
const menu = localStorage.getItem("ownedMenus");
const topMenus = menu ? eval('(' + menu + ')') : [];
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.map(item => {
    pathSet[(parentPath + item.code).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.code,
      name: item.name,
      // icon: item.icon || '',
      clickable:item.clickable==undefined?true:false
    }
    if (!!item.children && item.children.length > 0) {
      getPathSet(item.children, parentPath + item.code + '/')
    }
  })
}

getPathSet(topMenus);

function Bread({ location }) {
  let pathNames = [];
  console.dir(pathSet);
  pathSet['Home'] = {
     path: '/',
     name: '主页',
     clickable: false
  };
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + '-' + item).hyphenToHump())
    } else {
      pathNames.push(('-' + item).hyphenToHump())
    }
  })
  console.dir(pathNames);
  const breads = pathNames.map((item, key) => {
    return (
      
      <Breadcrumb.Item key={key}>
        {pathSet[item].icon
          ? <Icon type={pathSet[item].icon} />
          : ''}
        <span className={styles.breadFont}>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="home" />
          <span className={styles.breadFont}>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object,
}

export default Bread
