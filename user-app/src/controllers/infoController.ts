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
    this.router.post('/users/info/',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                const userAge = userInfo.age ? userInfo.age : user.age;
                const userHeight = userInfo.height ? userInfo.height : user.height;
                const userAddress = userInfo.physAddress ? userInfo.physAddress : user.physAddress;
                user.addInfo({age: userAge, height: userHeight, physAddress: userAddress});
                res.send("Info added: " + JSON.stringify(userList));
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
    this.router.put('/users/info/',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                const userAge = userInfo.age ? userInfo.age : user.age;
                const userHeight = userInfo.height ? userInfo.height : user.height;
                const userAddress = userInfo.physAddress ? userInfo.physAddress : user.physAddress;
                user.changeInfo({age: userAge, height: userHeight, physAddress: userAddress});
                res.send("Info changed: " + JSON.stringify(userList));
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }

}

export default InfoController;