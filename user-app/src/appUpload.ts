import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import UploadRouter from './routes/upload.route';

// On file upload see:
// https://stackoverflow.com/questions/15562273/how-can-i-access-the-uploaddir-attribute-of-express
// https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
// https://docs.fineuploader.com/tag/3.8.2/quickstart/03-setting_up_server.html

// On bodyParser
// https://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", express.static(path.join(__dirname, "/public")));
app.use('/', UploadRouter);

app.listen(8000);