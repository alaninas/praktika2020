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
    <UsersSearch
      v-bind:userSearch="userSearch"
    />
  </div>
  <div class="card fluid">
    <p class="section">Users Saved</p>
      <div class="row"><div class="col-lg-12 col-md-12 col-sm-12">
        <UserTable
          v-bind:users="users"
          v-bind:sortByName="sortByName"
          v-bind:sortByEmail="sortByEmail"
          v-bind:sortByAge="sortByAge"
          v-bind:removeUser="removeUser"
        />
      </div></div>
  </div>
</template>

<script lang="ts">
// import UserComponent from '@/components/UserComponent.vue' // import the component, @ is an alias to /src
import usersFactory from '@/modules/UsersFactory'
import ValidationErrors from '@/modules/ValidationErrors'
import User from '@/modules/User'
import { reactive } from 'vue'
import UsersSearch from '@/components/UsersSearch.vue'
import UserTable from '@/components/UserTable.vue'

export default {
  el: '#mapp',
  name: 'Users',
  components: {
    UsersSearch,
    UserTable
  },
  // props: Readonly<{test: User;} & {}>
  setup () {
    const user = new User({})
    const userValidate = reactive({ data: new ValidationErrors({}) })
    const { users, usersAdd, usersRemove, isNameUnique, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail } = usersFactory()
    function dummy () {
      return true
    }
    function addUser (tuser: User) {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      if (!isNameUnique(tuser)) nu.validate.setErrors({ isValid: false, messages: ['User name is not unique.'] })
      userValidate.data = nu.getUserValidate()
      if (userValidate.data.isValid) {
        usersAdd(nu)
      }
      return users
    }
    function removeUser (tuser: User) {
      return usersRemove(tuser)
    }
    function sortByName (reverse?: boolean) {
      return usersSortByName({ reverse })
    }
    function sortByEmail (reverse?: boolean) {
      return usersSortByEmail({ reverse })
    }
    function sortByAge (reverse?: boolean) {
      return usersSortByAge({ reverse })
    }
    function userSearch (pattern?: string) {
      return usersSearchByName({ pattern })
    }

    return { dummy, user, users, addUser, removeUser, userValidate, sortByName, sortByEmail, sortByAge, userSearch }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
