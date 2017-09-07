import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  Card,
  Popover
} from 'antd';
import styles from '../less/Home.less';

const FormItem = Form.Item

const Home = ({
  loading
}) => {
  const orderContent = <div>已审核订单：300张</div>;
  return (
    <div style={{'padding-top': '5px', 'padding-left': '5px', width: '99%'}}>
    <Card title={<b>货位变化</b>} bordered={true} noHovering={true} >
    <div className={styles.topDiv}>
  <div className={styles.parent}>
    <Link to='/forward/order'><Popover content={orderContent}><div className={styles.cfx} onclick="order">入库订单</div></Popover></Link>
    <div className={styles.line}>
       订单收货
       <hr />
    </div>
    <div className={styles.rightDiv}>
       <div className={styles.rightArrow}></div>
    </div>
    <Link to="/forward/receiveBill"><div className={styles.oval}>收货单</div></Link>
    <div className={styles.line}>
      收货单审核、容器满容
      <hr />
    </div>
     <div className={styles.rightDiv}>
       <div className={styles.rightArrow}></div>
     </div>
     <Link to="/inner/task"><div className={styles.taskOval}>上架指令</div></Link>
     <div className={styles.line}>
        执行上架指令
        <hr />
        待上架指令：300
     </div>
     <div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
     <div className={styles.circle}>结束</div>
  </div>
  <div className={styles.twoLine}>
     <Link to="/forward/alcNtcBill"><div className={styles.cfx}>配货通知单</div></Link>
     <div className={styles.line}>
        加入波次
        <hr />
     </div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<Link to="/forward/waveBill"><div  className={styles.oval}>波次单</div></Link>
<div className={styles.line}>
波次启动
<hr />
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<Link to="/inner/task"><div className={styles.taskOval}>拣货、补货指令</div></Link>
<div className={styles.line}>
执行指令
<hr />
待补货：300，待拣货：100
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<Link to="/inner/task"><div className={styles.taskOval}>装车指令</div></Link>
<div className={styles.line}>
执行装车指令
<hr />
待装车指令：300
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.cfx}>装车单</div>
</div>
<div className={styles.twoLine}>
<div className={styles.cfx}>领用单</div>
<div className={styles.line}>
生成指令
<hr />
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.taskOval}>拣货指令</div>
<div className={styles.line}>
执行拣货指令
<hr />
待拣货：100
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.taskOval}>装车指令</div>
<div className={styles.line}>
执行装车指令
<hr />
待装车指令：300
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.cfx}>装车单</div>
</div>
<div className={styles.twoLine}>
<div className={styles.cfx}>退仓通知单</div>
<div className={styles.line}>
退仓收货
<hr />
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.oval}>退仓单</div>
<div className={styles.line}>
退仓单审核
<hr />
待拣货：100
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.taskOval}>退仓上架指令</div>
<div className={styles.line}>
执行退仓上架指令
<hr />
待装车指令：300
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.circle}>结束</div>
</div>
<div className={styles.twoLine}>
<div className={styles.cfx}>退货通知单</div>
<div className={styles.line}>
生成退货下架指令
<hr />
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.taskOval}>退货下架指令</div>
<div className={styles.line}>
执行退货下架指令
<hr />
待下架：100
</div>
<div className={styles.rightDiv}>
         <div className={styles.rightArrow}></div>
     </div>
<div className={styles.taskOval}>交接指令</div>
<div className={styles.line}>
执行交接指令
<hr />
待交接指令：300
</div>
<div className={styles.rightDiv}>
<div className={styles.rightArrow}></div>
</div>
<div className={styles.cfx}>供应商退货单</div>
</div>
</div>
</Card>
</div>
  );
};

Home.propTypes = {
};

export default Home;