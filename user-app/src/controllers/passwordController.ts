import express from 'express';
import BaseController from './baseController';
import { User } from '../user';


class PasswordController extends BaseController {
  public router = express.Router();
  constructor(list: User[]) {
    super(list);
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post('/users/pswd',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                try {
                    const pswd = userInfo.password;
                    const pswdRepeat = userInfo.repeat;
                    user.createPassword(pswd, pswdRepeat);
                } catch (err) {
                    res.status(401).send(err.message);
                } finally {
                    res.send("Password added: " + JSON.stringify(userList));
                }
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
    this.router.put('/users/pswd',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.getList();
            const user = this.getUser(userList, userInfo.name);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                try {
                    const pswd = userInfo.password;
                    user.changePassword(pswd);
                } catch (err) {
                    res.status(401).send(err.message);
                } finally {
                    res.send("Password changed: " + JSON.stringify(userList));
                }
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }
}
export default PasswordController;