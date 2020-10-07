<template>
  <div id="mapp" class="users card fluid">
    <p class="section">Users</p>
    <ul class="row">
      <li class="col-lg-12 col-md-12 col-sm-12" v-for="user in users.data" :key="user">
        <!-- user component to output user data fields -->
        {{ user }}
        <button class="button inverse" @click="removeUser(user.name)">Remove</button>
      </li>
    </ul>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <form>
        <label for="userName">Name</label>
        <input class="col-lg-5 col-md-6 col-sm-11"
          v-bind:class="{ invalid: newUserError.errFlag, valid: !newUserError.errFlag }"
          type="text" name="userName" v-model="newUser" required
        />
        <label for="ageInput">Age</label>
        <input class="col-lg-5 col-md-3 col-sm-11"
          type="number" name="ageInput" v-model="newAge" min="18" max="65"
        />
        <input type="submit" value="Submit" class="button primary col-lg-2 col-md-3 col-sm-12" @click="addUser(newUser, newAge)">
        <!-- <button class="button primary col-lg-2 col-md-3 col-sm-12" @click="addUser(newUser)">Add</button> -->
        </form>
        <div class="card fluid error" v-if="newUserError.errFlag"> {{newUserError.message}} </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  el: '#mapp',
  setup () {
    const newUserError: {errFlag: boolean; message: string} = reactive({
      errFlag: false,
      message: 'my error message'
    })
    const users = reactive({
      data: [{ name: 'user1', age: 25 }, { name: 'u2', age: 33 }]
    })
    // name, age, email ..
    function addUser (newUser: string, newAge: number) {
      if (users && newUser && newUser.length > 0 && newAge && newAge > 17) {
        newUserError.errFlag = false
        const index = users.data.findIndex(fr => fr.name === newUser)
        if (index > -1) {
          newUserError.message = 'Please choose unique user name'
          newUserError.errFlag = true
        } else {
          newUserError.errFlag = false
          const nu = { name: newUser, age: newAge }
          users.data.push(nu)
        }
      } else {
        newUserError.message = 'Please provide valid input'
        newUserError.errFlag = true
      }
    }
    function removeUser (delUser: string) {
      const index = users.data.findIndex(fr => fr.name === delUser)
      if (index > -1) users.data.splice(index, 1)
    }
    return {
      removeUser,
      users,
      addUser,
      newUserError
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
