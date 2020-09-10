import express from 'express';
import bodyParser from 'body-parser';
import ListController from './controllers/listController';
import FriendController from './controllers/friendController';
import InfoController from './controllers/infoController';
import PasswordController from './controllers/passwordController';
import EmailController from './controllers/emailController';

// Source
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = new ListController();
const friends = new FriendController();
const info = new InfoController();
const password = new PasswordController();
const email = new EmailController();

app.use('/', users.router);
app.use('/', friends.router);
app.use('/', info.router);
app.use('/', password.router);
app.use('/', email.router);

const server = app.listen(3030);

export default server;