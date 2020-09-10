import express from 'express';
import ListController from './listController';

class EmailController {

  public router = express.Router();
  private lc = new ListController();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post('/users/email',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.lc.getList();
            const user = this.lc.getUser(userList, userInfo.name);
            if (user) {
                try {
                    const email = userInfo.email;
                    user.addEmail(email);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send("Email added: " + JSON.stringify(userList));
                }
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
    this.router.put('/users/email',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const userList = this.lc.getList();
            const user = this.lc.getUser(userList, userInfo.name);
            if (user) {
                try {
                    const email = userInfo.email;
                    user.changeEmail(email);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send("Email changed: " + JSON.stringify(userList));
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

export default EmailController;