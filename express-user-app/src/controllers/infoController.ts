import express from 'express';
import BaseController from './baseController';
import { User } from '../user/user';

class InfoController extends BaseController {
  public router = express.Router();
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
                try {
                    user.addInfo({age: userAge, height: userHeight, physAddress: userAddress});
                    res.send("Info added: " + JSON.stringify(userList));
                } catch (err) {
                    res.status(401).send(err.message);
                }
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
                try {
                    user.changeInfo({age: userAge, height: userHeight, physAddress: userAddress});
                    res.send("Info changed: " + JSON.stringify(userList));
                } catch (err) {
                    res.status(401).send(err.message);
                }
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }
}
export default InfoController;