<template>
  <tr v-for="user in users" :key="user">
    <td data-label="Id" :title="user._id">
      <router-link :to="{name: 'Edit', params: {id: user._id}}" v-on:click="clickUserEdit(user._id, $route.params.id !== user._id)">{{ user._id.substr(18) }}</router-link>
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
import { useUser } from '@/modules/features/useUser'

export default {
  async setup () {
    const { unsorted } = await useUsers()
    const users = await unsorted()

    async function clickUserEdit (id: string, firstLoad: boolean) {
      if (firstLoad) await useUser({ userId: id, noDataReload: false })
    }

    return { users, clickUserEdit }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
