module.exports = [{
  key: 'user',
  name: 'user模块',
  icon: 'user'
}, {
  key: 'wms',
  name: 'WMS',
  icon: 'desktop',
  child: [{
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
    },{
      key: 'bin',
      name: '货位',
    }, {
      key: 'binType',
      name: '货位类型'
    }],
  },],
},];