<template>
  <tr v-for="(kuser, i) in users" :key="kuser">
    <td data-label="Nr | Del">{{i}}
      <label
        role="button"
        class="responsive-padding responsive-margin inverse"
        @click="removeUser(kuser)">
        Del
      </label>
    </td>
    <td data-label="Name">{{ kuser.name }}</td>
    <td data-label="Age">{{ kuser.age }}</td>
    <td data-label="Email">{{ kuser.email }}</td>
  </tr>
</template>

<script lang="ts">
import User from '@/modules/User'
import usersFactory from '@/modules/UsersFactory'
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
    const { users, usersRemove } = usersFactory(props.pusers)
    function removeUser (tuser: User) {
      return usersRemove(tuser)
    }
    return { users, removeUser }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
