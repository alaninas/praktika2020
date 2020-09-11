import express from 'express';
import { UserList } from '../userList';
import { User } from '../user';

class BaseController extends UserList {
  public router = express.Router();
  // public list: User[];

  constructor(list: User[]) {
    super(list);
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get('/',  (req, res) => {
      res.send('GET from Home');
    })

    this.router.post('/',  (req, res) => {
      res.send('POST from Home');
    })

    this.router.get('/users',  (req, res) => {
      if (this.getList().length > 0) {
          res.json(this.getList());
      } else {
          res.status(404).send('No users in DB');
      }
    })

    this.router.get('/users/:name/',  (req, res, next) => {
      const userInfo = req.params;
      if (userInfo.name) {
        const user = this.getUser(this.getList(), userInfo.name);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('No user found')
        }
      } else {
        res.status(400).send('No user name provided')
      }
    })

    this.router.post('/users/', (req, res) => {
      const userInfo = req.body;
      if (userInfo.name) {
          const newUser = new User(userInfo.name);
          if (this.getUser(this.getList(), userInfo.name)) {
              res.send("Duplicates not added: " + JSON.stringify(this.getList()));
          } else {
              this.getList().push(newUser);
              res.send(userInfo.name + " User created: " + JSON.stringify(this.getList()));
          }
      } else {
          res.status(400).send('No user name provided');
      }
    })

    this.router.delete('/users/',  (req, res) => {
        const userInfo = req.body;
        if (userInfo.name) {
            const user = this.getUser(this.getList(), userInfo.name);
            if (user) {
                const index = this.getList().indexOf(user);
                this.getList().splice(index, 1);
                res.send("User deleted: " + JSON.stringify(this.getList()));
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('No user name provided');
        }
    })
  }

}

export default BaseController;