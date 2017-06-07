'use strict'

const mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
	.forEach(function (file) {
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

    '/swms/(.*)': 'http://127.0.0.1:8080/sardine-wms-web',
	
};