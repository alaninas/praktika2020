<template>
  <input
    type="text"
    name="searchInput"
    v-model="pattern.data"
    placeholder="user email to search"
    @input="userSearch(pattern.data)" @keyup.enter="userSearch(pattern.data)"
  />
  <div class="section" v-if="userSearchResults.data.length">
    <ul>
      <li v-for="(user, i) in userSearchResults.data" :key="user">
        <b>Index:</b> {{i}} |
        <b>Data:</b> {{ displayUserData(user) }} |
        <b>Link:</b> <router-link :to="{name: 'Edit', params: {id: user._id}}">{{ user._id }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import { useUsers } from '@/modules/features/useUsers'
import { displayUserData } from '@/modules/utilities/user-utility'

export default {
  name: 'UsersSearch',
  async setup () {
    const pattern = reactive({ data: '' })
    const { searchByEmail } = await useUsers()
    const userSearchResults: {data: UserInterface[] | []} = reactive({ data: [] })

    function userSearch (pattern?: string): UserInterface[] {
      userSearchResults.data = searchByEmail({ pattern })
      return userSearchResults.data
    }
    const stopHandle = watchEffect(() => {
      userSearch(pattern.data)
    })
    stopHandle()

    return { pattern, userSearch, userSearchResults, displayUserData }
  }
}
</script>

<style scoped lang="scss">
input[type="text"] {
  margin: 0;
}
</style>
