import {
	browserHistory,
	hashHistory
} from 'dva/router';
import dva from 'dva';

const app = dva({
	history: hashHistory,
});

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