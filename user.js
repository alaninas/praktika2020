class User {
    constructor(name, password, email, info) {
        // this.name = name + "_stuff";
        this.name = name;
        this.password = password;
        this.email = email;
        this.info = info;
        // this.friends = new Array("Saab", "Volvo", "BMW");
        this.friends = []
    }

    addAge(age) {
        this.age = age;
    }

    createPassword(pwd1, pwd2) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
        }
    }

    addEmail(email) {
        if (!this.email) {
            this.email = email;
        }
    }

    changeEmail(email) {
        if (this.email !== email) {
            this.email = email;
        }
    }

    // Answer:
    // https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    addInfo({age, height, physAddress, extras}={}) {
        if (!this.age) {
            this.age = age;
        }
        if (!this.height) {
            this.height = height;
        }
        if (!this.physAddress) {
            this.physAddress = physAddress;
        }
        if (!this.extras) {
            this.extras = extras;
        }
    }

    changeInfo({age, height, physAddress, extras}={}) {
        if (this.age !== age) {
            this.age = age;
        }
        if (this.height !== height) {
            this.height = height;
        }
        if (this.physAddress !== physAddress) {
            this.physAddress = physAddress;
        }
        if (this.extras !== extras) {
            this.extras = extras;
        }
    }

    addFriend(friend) {
        // const numbers = {
            // one: 1,
        //   };
        //   const objectArray = Object.entries(numbers);
        //   objectArray.forEach(([key, value]) => {
            // console.log(typeof key); // 'one'
            // console.log(typeof value); // 1
        //   });  

          const objectArray = Object.entries(this.friends);
        //   console.log(typeof objectArray);
          objectArray.forEach(([key, value]) => {
            // console.log(typeof key); // 'one'
            // console.log(value); // 'one'
            // console.log(typeof value); // 1
          });        
        // console.log(typeof this.name);

        // console.log(typeof this.friends);
        // let x = Object.values(this);
        // console.log(typeof Object.values(this));
        // console.log(typeof Object.values(x));
        // console.log(typeof Object.keys(this.friends));

        const numbers = {
            one: 1,
            two: 2,
          };
          
        // console.log(typeof this.friends);
        // console.log(typeof this.friends[0]);
        // console.log(typeof this.name);
        // console.log(typeof friend.name);

        // console.log(JSON.stringify(this.friends));
        // if (!this.friends.find(fr => fr.name == friend.name)) {
        if (this.friends.indexOf(friend.name) <= -1) {
            //In the array!
            // console.log(typeof this.name);
            // console.log(JSON.stringify(this.friends));
            // console.log(typeof friend.name);
            this.friends.push(friend.name);
            // if (friend.addFriend) {
            if (friend.friends.indexOf(this.name) <= -1) {
                // friend.addFriend(this);
                friend.friends.push(this.name);
            }
        } else {
            return;
        }
    }

}

module.exports = User;