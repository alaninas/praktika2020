import listUtility from './listUtility';
import friendUtility from './friendUtility';
import infoUtility from './infoUtility';
import passwordUtility from './passwordUtility';
import emailUtility from './emailUtility';
import express from 'express';
import bodyParser from 'body-parser';

// Source
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = new listUtility();
const friends = new friendUtility();
const info = new infoUtility();
const password = new passwordUtility();
const email = new emailUtility();

app.use('/', users.router);
app.use('/', friends.router);
app.use('/', info.router);
app.use('/', password.router);
app.use('/', email.router);

app.listen(3030)