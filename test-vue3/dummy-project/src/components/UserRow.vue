<template>
  <tr v-for="(user, i) in users" :key="user">
    <td data-label="Nr | Del">{{i}}
      <label
        role="button"
        class="responsive-padding responsive-margin inverse"
        @click="usersRemove(user)">
        Del
      </label>
    </td>
    <td data-label="User Id">{{ user.userName }}</td>
    <td data-label="Full Name">{{ user.fullnameString }}</td>
    <td data-label="Age">{{ user.age }}</td>
    <td data-label="Email">{{ user.email }}</td>
    <td data-label="Country">{{ user.country }}</td>
    <td data-label="Address">{{ user.addressString }}</td>
  </tr>
</template>

<script lang="ts">
import useUsers from '@/modules/features/useUsers'

export default {
  name: 'UserRow',
  setup () {
    const { users, usersRemove } = useUsers()
    return { users, usersRemove }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
