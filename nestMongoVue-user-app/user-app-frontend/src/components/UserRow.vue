<template>
  <tr v-for="user in users" :key="user">
    <td data-label="Id | Del" :title="user._id">
      <router-link :to="{name: 'Edit', params: {id: user._id}}" v-on:click="clickUserEdit(user._id || $route.params.id)">{{ user._id.substr(18) }}</router-link>
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
    <td data-label="Country">{{ user.country }}</td>
    <td data-label="Address">{{ user.address }}</td>
  </tr>
</template>

<script lang="ts">
import { useUsers } from '@/modules/features/useUsers'
import { ref } from 'vue'
import { useUser } from '@/modules/features/useUser'

export default {
  name: 'UserRow',
  async setup () {
    const { unsorted, removeUser } = await useUsers()
    const users = await unsorted()
    const userId = ref('')

    function usersRemove (param: string) {
      console.log(`inside userDelete ${param}`)
      removeUser(param)
    }

    async function clickUserEdit (id: string) {
      userId.value = id
      console.log(`@@@@@@@@@@@ -> ${id}`)
      await useUser({ userId: userId.value, noDataReload: false })
    }

    return { usersRemove, users, clickUserEdit }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
