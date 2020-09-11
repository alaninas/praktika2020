import express from 'express';
import bodyParser from 'body-parser';
// import UserList from './userList';
import ListController from './controllers/baseController';
import UserController from './controllers/userController';
import InfoController from './controllers/infoController';
import PasswordController from './controllers/passwordController';
import EmailController from './controllers/emailController';
import { User } from './user';

// Source
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
const list = new ListController(users);
const friends = new UserController(users);
const info = new InfoController(users);
const password = new PasswordController(users);
const email = new EmailController(users);

app.use('/', list.router);
app.use('/', friends.router);
app.use('/', info.router);
app.use('/', password.router);
app.use('/', email.router);

export default app;