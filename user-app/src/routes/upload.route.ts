import express from 'express';
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
      .json({err})
      .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "./temp"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

UploadRouter.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "../../uploads/" + req.file.filename + ".png");
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded! Temp name: " + req.file.path);
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    }
  );

export default UploadRouter;