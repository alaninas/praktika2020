<template>
  <tr v-for="user in users" :key="user">
    <td data-label="Id | Del" :title="user._id">{{ user._id.substr(20) }}
      <label
        role="button"
        class="responsive-padding responsive-margin inverse"
        @click="usersRemove(user._id)">
        Del
      </label>
    </td>
    <td data-label="Full Name">{{ user.password }}</td>
    <td data-label="Age">{{ user.age }}</td>
    <td data-label="Email">{{ user.email }}</td>
    <td data-label="Fullname">{{ user.fullname }}</td>
    <td data-label="Address">{{ user.address }}</td>
  </tr>
</template>

<script lang="ts">
import { useUsers } from '@/modules/features/useUsers'

export default {
  name: 'UserRow',
  async setup () {
    const { unsorted, removeUser } = await useUsers()
    const users = await unsorted()

    function usersRemove (param: string) {
      console.log(`inside userDelete ${param}`)
      removeUser(param)
    }

    return { usersRemove, users }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
