import { User } from './userPT';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userList = new Array<User>();

// GET
// Send request, use query string PARAMS, limited length
app.get('/', function (req, res) {
    res.send('Home page for the User App !');
})

// 2 Get user list
app.get('/users', function (req, res) {
    res.send("Current user list: " + JSON.stringify(userList));
})

// 3 Get user by name
// Send request, use query string PARAMS
app.get('/createUser/:name', function(req, res) {
    const petras2 = new User(req.param.name)
    userList.push(petras2);
    res.send("New user added")
});

// POST
// Create
// 1 Create user
app.post('/createUser/', function(req, res) {
    const petras2 = new User(req.body.name)
    userList.push(petras2);
    res.send(req.body.name + " is created: " + JSON.stringify(petras2))
}); // taip reikia perduoti i post

// 2 Create a friend
app.post('/user/add-friend', function (req, res) {
    console.log(req.body.user);
    console.log(req.body.friend);
    res.send('post hello world askljdkljasd');
})

// PUT
// Update
// 1 add info
// 2 change info

// DELETE
// Search by name the user to delete
// Remove from the user array


app.listen(3030);