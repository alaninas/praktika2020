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
export default {
  name: 'UserRow',
  props: {
    users: {
      type: Array
    },
    removeUser: {
      type: Function,
      required: true
    }
  },
  setup () { return {} }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
