import express from 'express';
import listUtility from './listUtility';

class PasswordUtility {

  public router = express.Router();
  private lu = new listUtility();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post('/users/pswd',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.lu.getList();
            const user = this.lu.getUser(userList, userInfo.name);
            if (user) {
                try {
                    const pswd = userInfo.password;
                    const pswdRepeat = userInfo.repeat;
                    user.createPassword(pswd, pswdRepeat);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send("Password added: " + JSON.stringify(userList));
                }
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
    this.router.put('/users/pswd',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.lu.getList();
            const user = this.lu.getUser(userList, userInfo.name);
            if (user) {
                try {
                    const pswd = userInfo.password;
                    user.changePassword(pswd);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send("Password changed: " + JSON.stringify(userList));
                }
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }

}

export default PasswordUtility;