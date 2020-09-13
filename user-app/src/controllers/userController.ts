import express from 'express';
import BaseController from './baseController';
import { User } from '../user';

class UserController extends BaseController {
  public router = express.Router();
  constructor(list: User[]) {
    super(list);
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post('/users/add-friend',  (req, res) => {
        const requestNames = req.body;
        if (requestNames.user && requestNames.friend) {
            const user = this.getUser(this.getList(), requestNames.user);
            // const friend = this.getUser(this.getList(), users.friend);
            if (!user){
                res.status(401).send('User not found');
            } else {
                const friend = this.getUser(this.getList(), requestNames.friend);
                if (!friend) {
                    res.status(402).send('Friend not found');
                } else {
                    user.addFriend(friend);
                    res.send(user.name + " friended " + friend.name);
                }
            }
        } else {
            res.status(403).send('Missing request Names');
        }
    })
    this.router.post('/users/remove-friend',  (req, res) => {
        const requestNames = req.body;
        if (requestNames.user && requestNames.friend) {
            const user = this.getUser(this.getList(), requestNames.user);
            // const friend = this.getUser(this.getList(), users.friend);
            if (!user){
                res.status(401).send('User not found');
            } else {
                const friend = this.getUser(this.getList(), requestNames.friend);
                if (!friend) {
                    res.status(402).send('Friend not found');
                } else {
                    if (!this.checkFriendship(this.getList(), user.name, friend.name)) {
                        res.status(300).send('Already not friends');
                    } else {
                        user.removeFriend(friend);
                        res.send(user.name + " unfriended " + friend.name);
                    }
                }
            }
        } else {
            res.status(403).send('Missing request Names');
        }
    })
  }
}
export default UserController;