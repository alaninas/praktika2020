import express from 'express';
import http from "http";
import path from "path";
import fs from "fs";
import multer from "multer";

// On parsing forms w/o thir-party libraries
// https://medium.com/javascript-in-plain-english/parsing-post-data-3-different-ways-in-node-js-e39d9d11ba8
const UploadRouter = express.Router();

const handleError = (err: any, res: express.Response) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
};

// The endpoint for uploads
UploadRouter.post("/uploads", (req, res, next) => {
    const savePath = __dirname + '/uploads';
    let uuid: any;
    if (req.body) {
        uuid = req.body.qquuid;
        const totalFileSize = req.body.qqtotalfilesize;
    }
    if (req.file.qqfile) {
        const exists = fs.existsSync(req.file.qqfile.path);
        fs.rename(req.file.qqfile.path, savePath + "/" + uuid, (err) => {
        if (err) {
            console.log(">> Error!: " + err);
            res.send(JSON.stringify({ success: false, error: err }), { 'Content-type': 'application/json' }, 200);
        }
        else {
            console.log('File Uploaded! ' + savePath + "/" + uuid);
            res.send(JSON.stringify({ success: true }), { 'Content-type': 'application/json' }, 200);
        }});
    } else {
        res.send(JSON.stringify({ success: false, error: "No file sent!" }, { "Content-type": "application/json" }, 200));
    }
 });

export default UploadRouter;