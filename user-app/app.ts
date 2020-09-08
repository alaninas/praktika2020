import { User } from './user';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userList = new Array<User>(new User('U1'), 
                                 new User('U2'),
                                 new User('U3'));

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
    const u = new User(req.body.name);
    if (getUser(userList, req.params.name)) {
        res.send("Duplicate..." + JSON.stringify(userList));
    } else {
        userList.push(u);
        res.send(req.params.name + " User created: " + JSON.stringify(userList));
    }
}); // taip reikia perduoti i post

// Send request, use PV/QS
app.get('/createUser/:name', function(req, res) {
    // req.query.name?.toString()
    // type = string | undefined
    const u = new User(req.params.name);
    if (getUser(userList, req.params.name)) {
        res.send("Duplicate..." + JSON.stringify(userList));
    } else {
        userList.push(u);
        res.send(req.params.name + " User created: " + JSON.stringify(userList));
    }
});


// 2 Create a friend
app.post('/user/add-friend', function (req, res) {
    const r1 = getUser(userList, req.body.user);
    const r2 = getUser(userList, req.body.friend);
    if (r1 && r2){
        try {
            r1.addFriend(r2);
        } catch  (err) {
            res.send("Err: " + err);
        } finally {
            res.send(req.params.name + " friended " + req.body.friend);
        }
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.post('/user/:name/add-friend', function (req, res) {
    const r1 = getUser(userList, req.params.name);
    const r2 = getUser(userList, req.body.friend);
    if (r1 && r2) {
        try {
            r1.addFriend(r2);
        } catch  (err) {
            res.send("Err: " + err);
        } finally {
            res.send(req.params.name + " friended " + req.body.friend);
        }
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

// 3 Remove friend
app.post('/user/remove-friend', function (req, res) {
    const r1 = getUser(userList, req.body.user);
    const r2 = getUser(userList, req.body.friend);
    if (r1 && r2) {
        try {
            r1.removeFriend(r2);
        } catch  (err) {
            res.send("Err: " + err);
        } finally {
            res.send(req.params.name + " unfriended " + req.body.friend);
        }
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.post('/user/:name/remove-friend', function (req, res) {
    const r1 = getUser(userList, req.params.name);
    const r2 = getUser(userList, req.body.friend);
    if (r1 && r2) {
        try {
            r1.removeFriend(r2);
        } catch  (err) {
            res.send("Err: " + err);
        } finally {
            res.send(req.params.name + " unfriended " + req.body.friend);
        }
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.post('/user/update', function (req, res) {
    const r1 = getUser(userList, req.body.name);
    const a = req.body.age ? req.body.age : r1?.age;
    const h = req.body.height ? req.body.height : r1?.height;
    const pa = req.body.physAddress ? req.body.physAddress : r1?.physAddress;
    if (r1) {
        r1.addInfo({age: a, 
            height: h,
            physAddress: pa});
        res.send("Updated: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.post('/user/:name/update', function (req, res) {
    const r1 = getUser(userList, req.params.name);
    const a = req.body.age ? req.body.age : r1?.age;
    const h = req.body.height ? req.body.height : r1?.height;
    const pa = req.body.physAddress ? req.body.physAddress : r1?.physAddress;
    if (r1) {
        r1.addInfo({age: a, 
            height: h,
            physAddress: pa});
        res.send("Updated: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

// PUT
// Update
app.put('/user/change', function (req, res) {
    const r1 = getUser(userList, req.body.name);
    const a = req.body.age ? req.body.age : r1?.age;
    const h = req.body.height ? req.body.height : r1?.height;
    const pa = req.body.physAddress ? req.body.physAddress : r1?.physAddress;
    if (r1) {
        r1.changeInfo({age: a, 
            height: h,
            physAddress: pa});
        res.send("Changed: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.put('/user/:name/change', function (req, res) {
    const r1 = getUser(userList, req.params.name);
    const a = req.body.age ? req.body.age : r1?.age;
    const h = req.body.height ? req.body.height : r1?.height;
    const pa = req.body.physAddress ? req.body.physAddress : r1?.physAddress;
    if (r1) {
        r1.changeInfo({age: a, 
                       height: h,
                       physAddress: pa});
        res.send("Changed: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

// DELETE
app.delete('/user/delete', function (req, res) {
    const r1 = getUser(userList, req.body.name);
    if (r1) {
        let index = userList.indexOf(r1);
        userList.splice(index, 1);
        res.send("User deleted: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.delete('/user/:name/delete', function (req, res) {
    const r1 = getUser(userList, req.params.name);
    if (r1) {
        let index = userList.indexOf(r1);
        userList.splice(index, 1);
        res.send("User deleted: " + JSON.stringify(userList));
    } else {
        res.send("Names..." + JSON.stringify(userList));
    }
})

app.listen(3030);