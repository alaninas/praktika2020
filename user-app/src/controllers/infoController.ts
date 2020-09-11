import express from 'express';
import BaseController from './baseController';
import { User } from '../user';

class InfoController extends BaseController {

  public router = express.Router();
//   private lc = new BaseController();
//
constructor(list: User[]) {
    super(list);
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post('/users/info',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (user) {
                const a = userInfo.age ? userInfo.age : user?.age;
                const h = userInfo.height ? userInfo.height : user?.height;
                const pa = userInfo.physAddress ? userInfo.physAddress : user?.physAddress;
                user.addInfo({age: a, height: h, physAddress: pa});
                res.send("Info added: " + JSON.stringify(userList));
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
    this.router.put('/users/info',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (user) {
                const a = userInfo.age ? userInfo.age : user?.age;
                const h = userInfo.height ? userInfo.height : user?.height;
                const pa = userInfo.physAddress ? userInfo.physAddress : user?.physAddress;
                user.changeInfo({age: a, height: h, physAddress: pa});
                res.send("Info changed: " + JSON.stringify(userList));
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }

}

export default InfoController;