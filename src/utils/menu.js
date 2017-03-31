module.exports =
  [
    {
      key: 'ia',
      name: '权限管理',
      child: [, {
        key: 'user',
        name: '用户',
      },
        {
          key: 'role',
          name: '角色',
        }],
    }, {
      key: 'basicInfo',
      name: '基本资料',
      child: [{
        key: 'customer',
        name: '客户',
      }, {
        key: 'supplier',
        name: '供应商',
      }, {
        key: 'category',
        name: '商品类别',
      }, {
        key: 'article',
        name: '商品',
      }, {
        key: 'container',
        name: '容器',
      }, {
        key: 'containerType',
        name: '容器类型',
      }, {
        key: 'bin',
        name: '货位',
      }, {
        key: 'binType',
        name: '货位类型'
      }]
    }, {
      key: 'forword',
      name: '正向物流',
      child: [{
        key: 'order',
        name: '入库订单'
      }, {
        key: 'receive',
        name: '收货单'
      }, {
        key: 'alcNtc',
        name: '出库通知单'
      }, {
        key: 'ship',
        name: '装车单'
      }]
    }, {
      key: 'backword',
      name: '退仓退货',
      child: [{
        key: 'rtnntcBill',
        name: '退仓通知单'
      }, {
        key: 'storeRtnBill',
        name: '门店退仓单'
      }]
    }, {
      key: 'home',
      name: '关于我们',
      icon: 'home',
      child: [{
        key: 'help',
        icon: 'question-circle-o',
        name: '帮助',
        className: 'help'
      }]
    }]



