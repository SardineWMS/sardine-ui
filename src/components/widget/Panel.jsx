import React from 'react';
import { Row, Col } from 'antd';
import panel from '../less/widget.css';

export interface PanelProps {
  title?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  children?: any;
}

export default (props: PanelProps) => {
  const {
    bodyStyle,
    title, ...others
  } = props;

  let children = props.children;

  let head;
  if (!title) {
    head = null;
  } else {
    head = (<div className={panel.panelheading}>
      <div className={panel.paneltitle}>{title}</div>
    </div>);
  };

  return (
    <div {...others} className={panel.panel + " " + panel.paneldefault}>
      {head}
      <div className={panel.panelbody} style={bodyStyle}>{children}</div>
    </div>
  );
};
