import listUtility from './listUtility';
import express from 'express';
import bodyParser from 'body-parser';

// Source
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const l = new listUtility();
app.use('/birds', l.router)

app.listen(3030)