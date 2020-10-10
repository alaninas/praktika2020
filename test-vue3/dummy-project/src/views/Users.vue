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
            <label for="userName">Name</label>
            <input
              v-bind:class="{ invalid: !userValidate.data.isValid, valid: userValidate.data.isValid }"
              type="text" name="userName" v-model="user.name" required
            />
          </span>
          <span class="col-lg-3 col-md-5 col-sm-12">
            <label for="ageInput">Age</label><input type="number" name="ageInput" v-model="user.age" min="18" max="100"/>
          </span>
          <span class="col-lg-3 col-md-8 col-sm-12">
            <label for="emailInput">Email</label><input type="email" name="emailInput" v-model="user.email" required/>
          </span>
          <input type="submit" value="Submit"
                 class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
                 @click="addUser(user)"/>
        </form>
        <div class="collapse error" v-if="!userValidate.data.isValid">
          <input type="checkbox" id="collapse-section1" checked aria-hidden="true">
          <label for="collapse-section1" aria-hidden="true">Please update input</label>
          <div>
            <ul><li v-for="error in userValidate.data.messages" :key="error">{{ error }}</li></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card fluid">
    <p class="section">Search</p>
      <input
        type="text" name="searchInput"
        v-model="userToSearch.data"
        placeholder="user name to search"
        @input="userSearch(userToSearch.data)" @keyup.enter="userSearch(userToSearch.data)"
      />
    <div class="section" v-if="searchResults.data.length">
      <ul>
        <li v-for="user in searchResults.data" :key="user">{{ user }}</li>
      </ul>
    </div>
  </div>
  <div class="card fluid">
    <p class="section">Users Saved</p>
      <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
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
    </div></div>
  </div>
</template>

<script lang="ts">
// import UserComponent from '@/components/UserComponent.vue' // import the component, @ is an alias to /src
import { createUsersArrayRef, usersAdd, usersRemove, isNameUnique, usersSearchByName } from '@/modules/UsersFactory'
import { usersSortByName, usersSortByAge, usersSortByEmail } from '@/modules/UsersSort'
import ValidationErrors from '@/modules/ValidationErrors'
import User from '@/modules/User'
import { reactive } from 'vue'

export default {
  el: '#mapp',
  name: 'Users',
  // props: Readonly<{test: User;} & {}>
  setup () {
    const userToSearch = reactive({ data: '' })
    const user = new User({})
    const userValidate = reactive({ data: new ValidationErrors({}) })
    const users = createUsersArrayRef([new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' })])
    // const users = reactive()
    // const users = createUsersArrayRef([])
    const searchResults: { data: User[] | undefined } = reactive({ data: [] })

    function dummy () {
      return true
    }
    function addUser (tuser: User) {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      if (!isNameUnique({ users, user: tuser })) nu.validate.setErrors({ isValid: false, messages: ['User name is not unique.'] })
      userValidate.data = nu.getUserValidate()
      if (userValidate.data.isValid) usersAdd({ users, user: nu })
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
    function userSearch (pattern?: string) {
      searchResults.data = usersSearchByName({ users, pattern })
      // alert(JSON.stringify(searchResults.data.length))
    }

    return { dummy, user, users, addUser, removeUser, userValidate, sortByName, sortByEmail, sortByAge, userToSearch, userSearch, searchResults }
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
  border-left: .475rem solid transparent;
  border-right: .475rem solid transparent;
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

// Sections
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}

// Errors
.collapse.error > :checked + label {
  border-bottom-color: var(--input-invalid-color);
  border-bottom-width: .225rem;
}

.collapse.error > label,
.collapse.error > :checked + label + div {
  border-color: var(--input-invalid-color);
}

.collapse.error > label {
  color: var(--input-invalid-color);
  font-weight: bold;
}
</style>
