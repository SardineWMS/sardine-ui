import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { config, menu } from '../../utils';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const topMenus = menu.map( item => item.key);
  const getMenus = function (menuArray,parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map(item => {
    if (item.child) {
      return (
        <SubMenu key={item.key}  className={item.className ? item.className: ''} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{item.name}</span>}>
          {getMenus(item.child,parentPath + item.key + '/')}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key} className={item.className ? item.className: ''} >
          <Link to={parentPath + item.key} style={{fontSize: 14}}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

class Header extends React.Component {
 constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
 }

 handleClick(e){
    if(e.key==='modify'){
        this.props.modifyPasswd();
    }else if(e.key==='exit')
    {
        this.props.logout();
    }
 }

  render() {
    const props = { ...this.props };
    const navChildren = [];
    const userTitle = (<div>
      <span className="img">
        <img
          src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
          width="30"
          height="30"
        />
      </span>
      <span>zs</span>
    </div>);

    navChildren.push(
      (<SubMenu className="user" title={userTitle} key="userInfo" style={{fontSize: 18}}>
        <Item key="a" style={{fontSize: 14}}>用户中心</Item>
        <Item key="modify" style={{fontSize: 14}}>修改密码</Item>
        <Item key="exit" style={{fontSize: 14}}>登出</Item>
      </SubMenu>));
    return (<TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
        id={`${this.props.id}-logo`}
      >
        <img width="100%" src="http://172.17.1.53:8888/logo/logo4.png" 
        height="45px"/>
      </TweenOne>
      {
        <TweenOne
          animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
          className={`${this.props.className}-nav`}
        >
          <Menu onClick={this.handleClick}
            mode="horizontal" defaultSelectedKeys={['0']}
            id={`${this.props.id}-menu`}
          >
           {navChildren}
          </Menu>
        </TweenOne>
      }
    </TweenOne>);
  }
}

Header.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Header.defaultProps = {
  className: 'header1',
};

export default Header;