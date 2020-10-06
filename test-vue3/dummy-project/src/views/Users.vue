<template>
  <div class="users">Users</div>
  <div v-for="user in users" :key="user">
    {{ user }}
  </div>
  <!-- <button @click="increment"> -->
    <!-- Count is: {{ state.count }}, double is: {{ state.double }} -->
  <!-- </button> -->
  <!-- <button @click="clear"> -->
    <!-- Clear counter -->
  <!-- </button> -->
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  setup () {
    const users = reactive({
      data: [{ user: 'user1' }, { user: 'u2' }]
    })

    // function clear () {
    // state.count = 0
    // }

    return {
      users
    }
  }
}
</script>
