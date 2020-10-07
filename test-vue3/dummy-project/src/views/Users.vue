<template>
  <div id="mapp" class="users card fluid">
    <p class="section">Users</p>
  <ul class="row">
    <li class="col-lg-12 col-md-12 col-sm-12" v-for="user in newArr.data" :key="user">
      <!-- user component to output user data fields -->
      {{ user }}
      <button class="button inverse" @click="removeUser(user.name)">Remove</button>
    </li>
  </ul>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <input class="col-lg-10 col-md-9 col-sm-11"
        v-bind:class="{ active: state.count, inactive: !state.count, 'text-danger': hasError }"
        type="text" name="userInput" v-model="newUser" required
      />
      <button class="button primary col-lg-2 col-md-3 col-sm-12" @click="addUser(newUser)">Add</button>
      <div class="card fluid error" v-if="state.count"> {{state.message}} </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  el: '#mapp',
  setup () {
    const state: {count: boolean; message: string} = reactive({
      count: false,
      message: 'my error message'
    })
    const newArr = reactive({
      data: [{ name: 'user1', isNinja: true }, { name: 'u2', isNinja: true }]
    })
    // name, age, email ..
    function addUser (newUser: string) {
      if (newArr && newUser && newUser.length > 0) {
        state.count = false
        const index = newArr.data.findIndex(fr => fr.name === newUser)
        if (index > -1) {
          state.message = 'Please choose unique user name'
          state.count = true
          console.log(state.count)
        } else {
          state.count = false
          console.log(state.count)
          const nu = { name: newUser, isNinja: true }
          newArr.data.push(nu)
        }
      } else {
        state.message = 'Please enter the user name'
        state.count = true
        console.log(state.count)
      }
    }
    function removeUser (delUser: string) {
      const index = newArr.data.findIndex(fr => fr.name === delUser)
      if (index > -1) {
        newArr.data.splice(index, 1)
      }
    }
    return {
      removeUser,
      newArr,
      addUser,
      state
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  border-width: .1em;
}

.active {
  border-color: red;
  background-color: #fff5f5;
}

.inactive {
  border-color: grey;
  background-color: white;
}
</style>
