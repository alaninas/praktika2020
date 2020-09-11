import express from 'express';
import ListController from './listController';
import { Friend } from '../friend';

class FriendController extends ListController {

  public router = express.Router();
//   private lc = new ListController();
// 
constructor(list: Friend[]) {
    super(list);
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post('/users/add-friend',  (req, res) => {
        const users = req.body;
        if (users.user && users.friend) {
            const user = this.getUser(this.getList(), users.user);
            const friend = this.getUser(this.getList(), users.friend);
            if (user && friend){
                try {
                    user.addFriend(friend);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send(user.name + " friended " + friend.name);
                }
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('Missing user or friend name');
        }
    })
    this.router.post('/users/remove-friend',  (req, res) => {
        const users = req.body;
        if (users.user && users.friend) {
            const user = this.getUser(this.getList(), users.user);
            const friend = this.getUser(this.getList(), users.friend);
            if (user && friend){
                try {
                    user.removeFriend(friend);
                } catch (err) {
                    res.send(err.message);
                } finally {
                    res.send(user.name + " unfriended " + friend.name);
                }
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('Missing user or friend name');
        }
    })
  }

}

export default FriendController;