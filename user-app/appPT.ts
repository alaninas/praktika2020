import { User } from './userPT';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userList = new Array<User>(new User('U1'), 
                                 new User('U2'));

let getUser = function(arr: Array<User>, name: string) {
    return arr.find(obj => {
        return obj.name === name
    });
}

// GET
// Send request, use query string PARAMS, limited length
app.get('/', function (req, res) {
    res.send('GET from Home');
})

// 2 Get user list
app.get('/users', function (req, res) {
    res.send("Current user list: " + JSON.stringify(userList));
})

// 3 Get user by name
// Send request, use path variables or QS
app.get('/users/:name', function(req, res) {
    // let index = userList.indexOf(req.param.name);
    let result = getUser(userList, req.params.name);
    res.send("User found: " + JSON.stringify(result))
});

// POST
// Create
app.get('/', function (req, res) {
    res.send('POST from Home');
})

// 1 Create user
app.post('/createUser/', function(req, res) {
    const petras2 = new User(req.body.name)
    userList.push(petras2);
    res.send(req.body.name + " is created: " + JSON.stringify(petras2))
}); // taip reikia perduoti i post

// Send request, use PV/QS
// Ex., http://localhost:3030/createUser/name?name=Vardas
app.get('/createUser/:name', function(req, res) {
    // req.query.name?.toString()
    // type = string | undefined
    // let t = req.query.another?.toString();
    let t = req.params.name;
    const petras2 = new User(t);
    // userList.push(petras2);
    res.send(t + " User created: " + JSON.stringify(petras2))
});


// 2 Create a friend
app.post('/user/add-friend', function (req, res) {
    // let r1 = userList.find(obj => {
        // return obj.name === req.body.user
    // });
    let r1 = getUser(userList, req.body.user);
    let r2 = getUser(userList, req.body.friend);
    //   let r2 = userList.find(obj => {
        // return obj.name === req.body.friend
    // });
    if (r1 && r2) {
        r1.addFriend(r2);
        res.send(req.body.user + " friended " + req.body.friend);
    } else {
        res.send("Names...");
    }
})

// PUT
// Update
// 1 add info
// 2 change info

// DELETE
// Search by name the user to delete
// Remove from the user array

app.listen(3030);