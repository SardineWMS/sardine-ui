import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import { config, menu } from '../../utils'


const topMenus = menu.map( item => item.key)
const getMenus = function (menuArray,siderFold,parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (!!item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span style={{fontSize: 16}}>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}</span>}
          >
          {getMenus(item.child,siderFold,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key} style={{fontSize: 16}}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Sider({ siderFold,darkTheme,location,changeTheme }) {
  return (
    <div>
      <div className={styles.logo}>
        <img width="200px" src="http://172.17.1.53:8888/logo/sd-wmslogo1.png"/>
      </div>
      <Menu
        mode={siderFold?"vertical":"vertical"}
        theme={darkTheme?"dark":"light"}
        defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1]||'dashboard']}>
        {getMenus(menu,siderFold)}
      </Menu>
    </div>
  )
}   

export default Sider
