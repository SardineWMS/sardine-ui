'use strict'

const mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
	.forEach(function(file) {
		Object.assign(mock, require('./mock/' + file))
	});

// module.exports = mock;

module.exports = {
	'/api/users': require('mockjs').mock({
		success: true,
		'data|100': [{
			'id|+1': 1,
			name: '@cname',
			'age|11-99': 1,
			address: '@region'
		}],
		page: {
			total: 100,
			current: 1
		}
	}),

	'/api/authen/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/ia/authen',
	'/basic/category/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/category',
	'/basic/article/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/article',
	'/basic/supplier/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/supplier',
	'/basic/container/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/container',
	'/basic/customer/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/customer',
	'/basic/binType/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/bintype',
	'/basic/containertype/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/containertype',
	'/basic/bin/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/basicinfo/bin',
};