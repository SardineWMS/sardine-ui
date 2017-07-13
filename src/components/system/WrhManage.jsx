import React, { PropTypes } from 'react';
import { Tabs, Button  } from 'antd';
import WareHouseView from './WareHouseView';

const TabPane = Tabs.TabPane;

const WrhManage = ({
  wareHouses,
  defaultActiveKey,
  onCreate,
  onEdit,
  onLogin
}) => {
    function createWrh() {
        onCreate();
    }
    const operations = <p> <Button onClick={createWrh} type="primary" icon="plus">创建仓库</Button> 
    </p>;

    let wareHouseTabs = [];
    if (wareHouses) {
        for (let i = 0; i < wareHouses.length; i++) {

            let wareHouse = wareHouses[i];
            wareHouseTabs.push(<TabPane tab={wareHouse.shortName} key={wareHouse.uuid}>
              <WareHouseView wareHouse={wareHouse} onEdit={onEdit} onLogin={onLogin}/>
            </TabPane>);
        }
    }
    return (
        <Tabs tabBarExtraContent={operations} defaultActiveKey={defaultActiveKey}>
          {wareHouseTabs.length > 0 ? wareHouseTabs : <TabPane tab="空" key="1"><p>目前还没有仓库，快创建一个吧</p></TabPane> }
        </Tabs>
    );
};

export default WrhManage;