<template>
  <div id="myUsers" class="card fluid">
    <p class="section">Add User</p>
    <div class="row" id="userInput"><div class="col-lg-12 col-md-12 col-sm-12">
      <UserForm
        v-bind:propsUser="user"
        v-bind:addUser="addUser"
        v-bind:isValid="userValidationErrors.data.isValid"
        v-bind:errMessages="userValidationErrors.data.messages"
      />
    </div></div>
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
import usersFactory from '@/modules/UsersFactory'
import ValidationErrors from '@/modules/ValidationErrors'
import User from '@/modules/User'
import { reactive, Ref } from 'vue'
import UsersSearch from '@/components/UsersSearch.vue'
import UserTable from '@/components/UserTable.vue'
import UserForm from '@/components/UserForm.vue'

export default {
  el: '#myUsers',
  name: 'Users',
  components: {
    UserForm,
    UsersSearch,
    UserTable
  },
  setup () {
    const user = new User({})
    const userValidationErrors = reactive({ data: new ValidationErrors({}) })
    const { users, usersAdd, usersRemove, isNameUnique, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail } = usersFactory()
    function addUser (tuser: User): Ref<User[]> {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      if (!isNameUnique(nu)) nu.getUserValidate().setErrors({ isValid: false, messages: ['User name is not unique.'] })
      if (nu.getUserValidate().isValid) usersAdd(nu)
      userValidationErrors.data = nu.getUserValidate()
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

    return { user, users, addUser, removeUser, sortByName, sortByEmail, sortByAge, userSearch, userValidationErrors }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
</style>
