<template>
  <div class="users">Users</div>
  <ul>
      <li v-for="user in users.data" :key="user">
        <!-- user component to output user data fields, with remove button -->
        {{ user }}
      </li>
  </ul>
  <div>
    <input type="text" name="" id="" v-model="newUser"/>
    <button @click="addUser(newUser)">add</button>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'

export default {
  setup () {
    // name, age, email ..
    // check if no empty user added
    // css framework ? some...
    const users = reactive({
      data: [{ user: 'user1' }, { user: 'u2' }]
    })

    const users2 = ref([])
    // users2.value = [{ user: 'user1' }, { user: 'u2' }]

    function addUser (newUser: string) {
      const nu = { user: newUser }
      users.data.push(nu)
    }

    return {
      users,
      addUser
    }
  }
}
</script>
