import express from 'express';
import bodyParser from 'body-parser';
// import UserList from './userList';
import ListController from './controllers/listController';
import FriendController from './controllers/friendController';
import InfoController from './controllers/infoController';
import PasswordController from './controllers/passwordController';
import EmailController from './controllers/emailController';
import { Friend } from './friend';

// Source
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const users: Friend[] = [new Friend('U1'), new Friend('U2'), new Friend('U3') ];
const list = new ListController(users);
const friends = new FriendController(users);
const info = new InfoController(users);
const password = new PasswordController(users);
const email = new EmailController(users);

app.use('/', list.router);
app.use('/', friends.router);
app.use('/', info.router);
app.use('/', password.router);
app.use('/', email.router);

export default app;