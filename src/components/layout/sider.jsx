import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import styles from '../less/main.less'
import { config } from '../../utils'

const getMenus = function (menuArray, parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map(item => {
    if (!!item.children && item.children.length > 0) {
      return (
        <Menu.SubMenu key={item.code} title={<span style={{ fontSize: 16 }}>{item.icon ? <Icon type={item.icon} /> : ''}{menuArray.indexOf(item.key) >= 0 ? '' : item.name}</span>}
        >
          {getMenus(item.children, parentPath + item.code + '/')}
        </Menu.SubMenu>
      );
    } else {
      if (item.code == "divider") {
        return (<Menu.Divider key="divider" />);
      } else {
        return (
          <Menu.Item key={item.code}>
            <Link to={parentPath + item.code} style={{ fontSize: 16 }}>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {menuArray.indexOf(item.code) >= 0 ? '' : item.name}
            </Link>
          </Menu.Item>
        );
      };
    };
  });
};

function Sider({ location, menu }) {
  return (
    <div>
      <div className={styles.logo}>
        <img width="200px" src="http://172.17.1.53:8888/logo/sd-wmslogo1.png" />
      </div>
      <Menu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}>
        {getMenus(menu ? eval('(' + menu + ')') : [])}
      </Menu>
    </div>
  );
};

export default Sider;
