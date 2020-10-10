<template>
  <div id="mapp" class="users card fluid">
    <!-- <UserComponent
      v-bind:userName="newName.data"
      v-bind:userAge="newAge.data"
      v-bind:userEmail="newEmail.data"
      v-bind:addUser="addUser"
      v-bind:userErrors="{flag: errors.flag, message: errors.message}"
    /> -->
    <p class="section">Add User</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <form @submit.prevent="dummy">
          <span class="col-lg-3 col-md-7 col-sm-12">
            <label for="userName">Name {{ user.name }}</label>
            <input
              v-bind:class="{ invalid: !userValidate.data.isValid, valid: userValidate.data.isValid }"
              type="text" name="userName" v-model="user.name" required
            />
          </span>
          <span class="col-lg-3 col-md-5 col-sm-12">
            <label for="ageInput">Age {{ user.age }}</label><input type="number" name="ageInput" v-model="user.age" min="18" max="100"/>
          </span>
          <span class="col-lg-3 col-md-8 col-sm-12">
            <label for="emailInput">Email {{ user.email }}</label><input type="email" name="emailInput" v-model="user.email"/>
          </span>
          <input type="submit" value="Submit"
                 class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
                 @click="addUser(user)"/>
        </form>
        <div class="card fluid error" v-if="!userValidate.data.isValid">
          <div class="section">Please update input</div>
            <ul>
              <li v-for="error in userValidate.data.messages" :key="error">{{ error }}</li>
            </ul>
        </div>
      </div>
    </div>
    <p class="section">Users Saved</p>
    <table class="hoverable">
      <thead>
        <tr>
          <th>Nr <div class="sort-arrows"><span class="arrow"></span><span class="arrow down"></span></div> | Del</th>
          <th>Name
            <div class="sort-arrows">
              <span class="arrow" @click="sortByName()"></span>
              <span class="arrow down" @click="sortByName(true)"></span>
            </div>
          </th>
          <th>Age
            <div class="sort-arrows">
              <span class="arrow" @click="sortByAge()"></span>
              <span class="arrow down" @click="sortByAge(true)"></span>
            </div>
          </th>
          <th>Email
            <div class="sort-arrows">
              <span class="arrow" @click="sortByEmail()"></span>
              <span class="arrow down" @click="sortByEmail(true)"></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kuser, i) in users" :key="kuser">
          <td data-label="Nr | Del">{{i}} <label role="button" class="responsive-padding responsive-margin inverse" @click="removeUser(kuser)">Del</label></td>
          <td data-label="Name">{{ kuser.name }}</td>
          <td data-label="Age">{{ kuser.age }}</td>
          <td data-label="Email">{{ kuser.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
// import UserComponent from '@/components/UserComponent.vue' // import the component, @ is an alias to /src
import { createUsersArrayRef, usersAdd, usersRemove, isNameUnique, usersSearchByName } from '@/modules/UsersFactory'
import { usersSortByName, usersSortByAge, usersSortByEmail } from '@/modules/UsersSort'
import ValidationErrors from '@/modules/ValidationErrors'
import User from '@/modules/User'
import { reactive } from 'vue'

// filtravimas
// sort by age, name
export default {
  el: '#mapp',
  name: 'Users',
  // props: Readonly<{test: User;} & {}>
  setup () {
    const user = new User({})
    const userValidate = reactive({ data: new ValidationErrors({}) })
    const users = createUsersArrayRef([new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' })])
    // const users = createUsersArrayRef([])

    function dummy () {
      return true
    }
    function addUser (tuser: User) {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      isNameUnique({ users, user: tuser }) ? usersAdd({ users, user: nu }) : nu.validate.setErrors({ isValid: false, messages: ['User name is not unique.'] })
      // alert(JSON.stringify(usersSortByName({ users })))
      // alert(JSON.stringify(usersSortByEmail({ users })))
      // alert(JSON.stringify(usersSortByAge({ users, reverse: true })))
      // alert(JSON.stringify(usersSearchByName({ users, pattern: 'a' })))
      userValidate.data = nu.getUserValidate()
    }
    function removeUser (tuser: User) {
      usersRemove({ users, user: tuser })
    }
    function sortByName (reverse?: boolean) {
      usersSortByName({ users, reverse })
    }
    function sortByEmail (reverse?: boolean) {
      usersSortByEmail({ users, reverse })
    }
    function sortByAge (reverse?: boolean) {
      usersSortByAge({ users, reverse })
    }

    return { dummy, user, users, addUser, removeUser, userValidate, sortByName, sortByEmail, sortByAge }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Table
table tr {
  text-align: left;
}

table:not(.horizontal) {
  max-height: 100%;
}

// Form
input {
  border-width: .1em;
}

.invalid {
  border-color: red;
  background-color: #fff5f5;
}

.valid {
  border-color: grey;
  background-color: white;
}

form span {
  display: inline-block;
  white-space: nowrap;
}

// Sort
.arrow {
  width: 0;
  height: 0;
  border-left:   .475rem solid transparent;
  border-right:  .475rem solid transparent;
  border-bottom: .825rem solid #7d7d7d;
  display: inline-block;
}

.down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}

span.arrow {
  cursor: pointer;
}

span.arrow:hover {
  border-bottom-color: #3b4146;
}

.sort-arrows {
  display: inline;
  padding: .125rem;
}

.sort-arrows span ~ span {
  margin-left: .0125rem;
}
</style>
