<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>Nr | Del</th>
        <th>Name
          <div class="sort-arrows">
            <span class="arrow" @click="usersSortByName(false)"></span>
            <span class="arrow down" @click="usersSortByName(true)"></span>
          </div>
        </th>
        <th>Age
          <div class="sort-arrows">
            <span class="arrow" @click="usersSortByAge(false)"></span>
            <span class="arrow down" @click="usersSortByAge(true)"></span>
          </div>
        </th>
        <th>Email
          <div class="sort-arrows">
            <span class="arrow" @click="usersSortByEmail(false)"></span>
            <span class="arrow down" @click="usersSortByEmail(true)"></span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <UserRow />
    </tbody>
  </table>
</template>

<script lang="ts">
import UserRow from '@/components/UserRow.vue'
import useUsers from '@/features/useUsers'

export default {
  name: 'UsersTable',
  el: '#userTable',
  components: {
    UserRow
  },
  setup () {
    const { usersSortByName, usersSortByAge, usersSortByEmail } = useUsers()
    return { usersSortByName, usersSortByEmail, usersSortByAge }
  }
}
</script>

<style scoped src="../assets/userTable.css">
/* assets: jsons, csss */
</style>
