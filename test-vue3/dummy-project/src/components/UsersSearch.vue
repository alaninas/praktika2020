<template>
  <input
    type="text"
    name="searchInput"
    v-model="pattern.data"
    placeholder="user name to search"
    @input="userSearch(pattern.data)" @keyup.enter="userSearch(pattern.data)"
  />
  <div class="section" v-if="userSearchResults.data.length">
    <ul>
      <li v-for="(user, i) in userSearchResults.data" :key="user">{{ user.name }} -- {{ user.age }} -- {{ user.email }} -- {{i}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue'
import User from '@/modules/User'
import useUsers from '@/features/useUsers'

export default {
  name: 'UsersSearch',
  setup () {
    const pattern = reactive({ data: '' })
    const { usersSearchByName } = useUsers()
    const userSearchResults: {data: User[] | []} = reactive({ data: [] })

    function userSearch (pattern?: string): User[] {
      userSearchResults.data = usersSearchByName({ pattern })
      return userSearchResults.data
    }

    watchEffect(() => {
      userSearch(pattern.data)
    })

    return { pattern, userSearch, userSearchResults }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
