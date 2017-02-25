import {
	browserHistory,
	hashHistory
} from 'dva/router';
import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';

const app = dva({
	history: hashHistory,
	onError(e) {
		message.error(e.message, 3);//延时关闭3s
	},
	initialState: {
		loading: {
			global: true,
			models: {
				customer: true,
				article: true,
				bin: true,
				binType: true,
				category: true,
				container: true,
				containerType: true,
				customer: true,
				supplier: true,
				user: true,
			}
		}
	}
});
app.use(createLoading());

app.model(require('./models/User'));
app.model(require('./models/app'));
app.model(require('./models/BasicInfo/Category'));
app.model(require('./models/BasicInfo/Customer'));
app.model(require('./models/BasicInfo/Article'));
app.model(require('./models/BasicInfo/Supplier'));
app.model(require('./models/BasicInfo/Container'));
app.model(require('./models/BasicInfo/BinType'));
app.model(require('./models/BasicInfo/ContainerType'));
app.model(require('./models/BasicInfo/Bin'));


app.router(require('./router'));

app.start('#root');