import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import { scrollScreen } from 'rc-scroll-anim';

import Nav from './Nav';
import Footer from './Footer';

export default class Home extends React.Component {
  render() {
    return (
    <div>
      <Nav id="Nav" key="Nav"/>
      {this.props.children}
      <Footer id="Footer" key="Footer"/>
    </div>
    );
  }
}
