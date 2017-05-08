import React, { PropTypes } from 'react'
import { Menu, Icon, Button } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'

const SubMenu = Menu.SubMenu

function Header({  user, logout, switchSider, siderFold }) {
  let handleClickMenu = e => e.key === 'logout' && logout()
  return (
    <div className={styles.header}>
      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu title="基本资料">
        </SubMenu>
        <SubMenu style={{ float: 'right' }}
          title={<span><Icon type="user" />{user.name}</span>}
        >
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default Header
