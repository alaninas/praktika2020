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
    <td data-label="Name">{{ user.name }}</td>
    <td data-label="Age">{{ user.age }}</td>
    <td data-label="Email">{{ user.email }}</td>
  </tr>
</template>

<script lang="ts">
import useUsers from '@/features/useUsers'
import Users from '@/modules/Users'

export default {
  name: 'UserRow',
  props: {
    pusers: {
      type: Users,
      required: true
    }
  },
  setup (props: Readonly<{pusers: Users} & {}>) {
    const { users, usersRemove } = useUsers(props.pusers)
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
