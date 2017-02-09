import {
	browserHistory,
	hashHistory
} from 'dva/router';
import dva from 'dva';

const app = dva({
	history: hashHistory,
});

app.model(require('./models/Demo'));
app.model(require('./models/app'));
app.model(require('./models/BasicInfo/Category'));
app.model(require('./models/BasicInfo/Customer'));
app.model(require('./models/BasicInfo/Article'));
app.model(require('./models/BasicInfo/Supplier'));
app.model(require('./models/BasicInfo/Container'));

app.router(require('./router'));

app.start('#root');