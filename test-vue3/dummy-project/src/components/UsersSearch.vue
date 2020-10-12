<template>
  <input
    type="text"
    name="searchInput"
    v-model="pattern.data"
    placeholder="user name to search"
    @input="userSearch(pattern.data)" @keyup.enter="userSearch(pattern.data)"
  />
  <div class="section" v-if="searchUserArray.data.length">
    <ul>
      <li v-for="user in searchUserArray.data" :key="user">{{ user.name }} -- {{ user.age }} -- {{ user.email }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue'
import usersFactory from '@/modules/UsersFactory'
import Users from '@/modules/Users'
import User from '@/modules/User'

export default {
  name: 'UsersSearch',
  props: {
    pusers: {
      type: Users,
      required: true
    }
  },
  setup (props: Readonly<{pusers: Users} & {}>) {
    const pattern = reactive({ data: '' })
    const { usersSearchByName } = usersFactory(props.pusers)
    const searchUserArray: {data: User[] | []} = reactive({ data: [] })

    function userSearch (pattern?: string): User[] {
      searchUserArray.data = usersSearchByName({ pattern })
      return searchUserArray.data
    }
    watchEffect(() => {
      // console.log(users.value)
      userSearch(pattern.data)
    })
    return { pattern, userSearch, searchUserArray }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
