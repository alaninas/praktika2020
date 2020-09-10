import { User } from './user';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userList: User[] = [new User('U1'),new User('U2'),new User('U3')];
// const userList: User[] = [];

const getUser = (arr: User[], name: string) => {
    return arr.find(obj => {
        return obj.name === name
    });
}

const renderUserName = (arr: User[], name: string) => {
    return arr.find(obj => {
        return obj.name === name
    });
}

// Home route
app.get('/',  (req, res) => {
    res.send('GET from Home');
})
app.post('/',  (req, res) => {
    res.send('POST from Home');
})
// User lists
app.get('/users',  (req, res) => {
    if (userList.length > 0) {
        res.json(userList);
    } else {
        res.status(404).send('No users in DB');
    }
})
app.get('/users/:name/',  (req, res) => {
    const userInfo = req.params;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
        res.json(user);
    } else {
        res.status(404).send('No user found');
    }
})
// User route
app.post('/users/', (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const newUser = new User(userInfo.name);
        if (getUser(userList, userInfo.name)) {
            res.send("Duplicates not added: " + JSON.stringify(userList));
        } else {
            userList.push(newUser);
            res.send(userInfo.name + " User created: " + JSON.stringify(userList));
        }
    } else {
        res.status(400).send('No user name provided');
    }
})
app.delete('/users/',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
        if (user) {
            const index = userList.indexOf(user);
            userList.splice(index, 1);
            res.send("User deleted: " + JSON.stringify(userList));
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No user name provided');
    }
})

// Friends
app.post('/users/add-friend',  (req, res) => {
    const users = req.body;
    if (users.user && users.friend) {
        const user = getUser(userList, users.user);
        const friend = getUser(userList, users.friend);
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
app.post('/users/remove-friend',  (req, res) => {
    const users = req.body;
    if (users.user && users.friend) {
        const user = getUser(userList, users.user);
        const friend = getUser(userList, users.friend);
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

// Info
app.post('/users/info',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
        if (user) {
            const a = userInfo.age ? userInfo.age : user?.age;
            const h = userInfo.height ? userInfo.height : user?.height;
            const pa = userInfo.physAddress ? userInfo.physAddress : user?.physAddress;
            user.addInfo({age: a, height: h, physAddress: pa});
            res.send("Info added: " + JSON.stringify(userList));
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No user name provided');
    }
})
app.put('/users/info',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
        if (user) {
            const a = userInfo.age ? userInfo.age : user?.age;
            const h = userInfo.height ? userInfo.height : user?.height;
            const pa = userInfo.physAddress ? userInfo.physAddress : user?.physAddress;
            user.changeInfo({age: a, height: h, physAddress: pa});
            res.send("Info changed: " + JSON.stringify(userList));
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No user name provided');
    }
})

// Pswd
app.post('/users/pswd',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
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
app.put('/users/pswd',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
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

// Email
app.post('/users/email',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
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
app.put('/users/email',  (req, res) => {
    const userInfo = req.body;
    if (userInfo.name) {
        const user = getUser(userList, userInfo.name);
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

app.listen(3030);