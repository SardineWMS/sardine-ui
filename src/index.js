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
app.model(require('./models/BasicInfo/Category'));
app.model(require('./models/BasicInfo/Customer'));
app.model(require('./models/BasicInfo/Article'));
app.model(require('./models/BasicInfo/Supplier'));
app.model(require('./models/BasicInfo/Container'));
app.model(require('./models/BasicInfo/BinType'));
app.model(require('./models/BasicInfo/ContainerType'));
app.model(require('./models/BasicInfo/Bin'));
app.model(require('./models/ia/Role'));

app.router(require('./router'));

app.start('#root');