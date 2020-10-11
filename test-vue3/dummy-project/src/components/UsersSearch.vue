<template>
  <input
    type="text"
    name="searchInput"
    v-model="pattern.data"
    placeholder="user name to search"
    @input="userSearch(pattern.data)" @keyup.enter="userSearch(pattern.data)"
  />
  <div class="section" v-if="userSearch(pattern.data).length">
    <ul>
      <li v-for="user in userSearch(pattern.data)" :key="user">{{ user.name }} -- {{ user.age }} -- {{ user.email }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'UsersSearch',
  props: {
    userSearch: {
      type: Function
    }
  },
  setup () {
    const pattern = reactive({ data: '' })
    return { pattern }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
