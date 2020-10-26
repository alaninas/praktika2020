<template>
  <tr v-for="user in usersBE.data" :key="user">
    <td data-label="Id | Del" :title="user._id">{{ user._id.substr(20) }}
      <label
        role="button"
        class="responsive-padding responsive-margin inverse"
        @click="usersRemove()">
        Del
      </label>
    </td>
    <td data-label="Full Name">{{ user.password }}</td>
    <td data-label="Age">{{ user.age }}</td>
    <td data-label="Email">{{ user.email }}</td>
    <td data-label="Country">{{ user.name }}</td>
    <td data-label="Address">{{ user.address }}</td>
  </tr>
</template>

<script lang="ts">
import useUsers from '@/modules/features/useUsers'

export default {
  name: 'UserRow',
  async setup () {
    const { usersBE } = await useUsers()
    function usersRemove () {
      return true
    }
    return { usersRemove, usersBE }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
