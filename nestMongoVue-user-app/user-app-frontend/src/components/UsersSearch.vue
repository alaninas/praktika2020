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
      <li v-for="(user, i) in userSearchResults.data" :key="user">
        {{ user.userName }} -- {{ user.fullnameString}} -- {{ user.age }} -- {{ user.email }} -- {{ user.country }} -- {{ user.addressString }} -- {{i}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import { useUsersFunc } from '@/modules/features/useUsers'

export default {
  name: 'UsersSearch',
  async setup () {
    const pattern = reactive({ data: '' })
    // const { usersBE } = await useUsers()
    const { searchByEmail } = await useUsersFunc()
    const userSearchResults: {data: UserInterface[] | []} = reactive({ data: [] })

    function userSearch (pattern?: string): UserInterface[] {
      userSearchResults.data = searchByEmail({ pattern })
      return userSearchResults.data
    }

    const stopHandle = watchEffect(() => {
      userSearch(pattern.data)
    })

    stopHandle()

    return { pattern, userSearch, userSearchResults }
  }
}
</script>

<style scoped lang="scss">
input[type="text"] {
  margin: 0;
}
</style>
