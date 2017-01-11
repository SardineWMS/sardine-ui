'use strict'

const mock = {}

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
	.forEach(function(file) {
		Object.assign(mock, require('./mock/' + file))
	})

module.exports = mock


/*module.exports = {
	'/api/authen/(.*)': 'http://127.0.0.1:8080/sardine-wms-web/ia/authen',
};*/