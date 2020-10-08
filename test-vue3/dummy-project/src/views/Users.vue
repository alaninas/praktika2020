<template>
  <div id="mapp" class="users card fluid">
    <!-- User interface relevant? -->
    <UserComponent
      v-bind:userName="newName"
      v-bind:userAge="newAge"
      v-bind:userEmail="newEmail"
      v-bind:addUser="addUser"
      v-bind:userErrors="{flag: errors.flag, message: errors.message}"
    />
    <p class="section">Users Saved</p>
    <ul class="row">
      <li class="col-lg-12 col-md-12 col-sm-12" v-for="user in users.data" :key="user">
        {{ user }}
        <button class="button responsive-padding responsive-margin inverse col-lg-1 col-md-2 col-sm-3" @click="removeUser(user.name)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import UserComponent from '@/components/UserComponent.vue' // import the component, @ is an alias to /src
import { reactive } from 'vue'

export default {
  el: '#mapp',
  name: 'Users',
  components: {
    UserComponent // declare the component
  },
  setup () {
    const users = reactive({ data: [{ name: 'u1', age: 25, email: 'u1@gmail.com' }, { name: 'u3', age: 26, email: 'u3@yahoo.co.uk' }] })
    let errors = reactive({ flag: false, message: [''] })
    function unsetErrors () {
      errors.flag = false
      errors.message = []
      // return reactive({ flag: false, message: [] }) Reason for not working ???
      return errors
    }
    // Paklausti del validavimo -- kiekvienam laukui, kur ir kaip geriau daryt?
    function validateForm (newName: string, newAge: number, indexOfDuplicate: number) {
      errors = unsetErrors()
      if (newName && newAge && indexOfDuplicate < 0) return errors
      if (!newName) errors.message.push('Name required.')
      if (!newAge) errors.message.push('Age required.')
      if (indexOfDuplicate > -1) errors.message.push('User name already taken.')
      if (newAge && (newAge < 18 || newAge > 99)) errors.message.push('User age is not in range 18 to 99')
      errors.flag = true
      return errors
    }
    function addUser (newName: string, newAge: number, newEmail: string) {
      let index = -1
      if (newName && newName.length > 0 && newAge && newAge > 17) {
        index = users.data.findIndex(fr => fr.name === newName)
        if (index < 0) users.data.push({ name: newName, age: newAge, email: newEmail })
      }
      errors = validateForm(newName, newAge, index)
      // alert(JSON.stringify(errors.message))
      return users
    }
    function removeUser (delUser: string) {
      const index = users.data.findIndex(fr => fr.name === delUser)
      if (index > -1) users.data.splice(index, 1)
      return users
    }
    return { removeUser, addUser, users, errors }
  }
}
</script>
