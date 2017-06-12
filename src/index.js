import {
	browserHistory,
	hashHistory
} from 'dva/router';
import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';

const app = dva({
	history: hashHistory,
	onError(e, dispatch) {
		// dispatch({
		// 	type: 'app/hideLoginButtonLoading',
		// })
		message.error(e.message, 3);//延时3s关闭
	},
});
app.use(createLoading());

app.model(require('./models/ia/User'));
app.model(require('./models/app'));
app.model(require('./models/basicinfo/Category'));
app.model(require('./models/basicinfo/Customer'));
app.model(require('./models/basicinfo/Article'));
app.model(require('./models/basicinfo/Supplier'));
app.model(require('./models/basicinfo/Container'));
app.model(require('./models/basicinfo/BinType'));
app.model(require('./models/basicinfo/ContainerType'));
app.model(require('./models/basicinfo/Bin'));
app.model(require('./models/ia/Role'));
app.model(require('./models/forward/OrderBill'));
app.model(require('./models/forward/Receive'));
app.model(require('./models/system/System'));
app.model(require('./models/inner/DecInc'));
app.model(require('./models/forward/AlcNtcBill'));
app.model(require('./models/forward/AcceptanceBill'));
app.model(require('./models/tms/Carrier'));
app.model(require('./models/tms/Vehicle'));

app.router(require('./router'));

app.start('#root');