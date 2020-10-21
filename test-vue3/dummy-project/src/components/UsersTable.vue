<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>Nr | Del</th>
        <th>UserId
          <div class="sort-arrows">
            <span class="arrow" @click="sortByUserName(false)"></span>
            <span class="arrow down" @click="sortByUserName(true)"></span>
          </div>
        </th>
        <th>Age
          <div class="sort-arrows">
            <span class="arrow" @click="sortByAge(false)"></span>
            <span class="arrow down" @click="sortByAge(true)"></span>
          </div>
        </th>
        <th>Email
          <div class="sort-arrows">
            <span class="arrow" @click="sortByEmail(false)"></span>
            <span class="arrow down" @click="sortByEmail(true)"></span>
          </div>
        </th>
        <th>Country
          <div class="sort-arrows">
            <span class="arrow" @click="sortByCountry(false)"></span>
            <span class="arrow down" @click="sortByCountry(true)"></span>
          </div>
        </th>
        <th>Address
          <div class="sort-arrows">
            <span class="arrow" @click="sortByAddressString(false)"></span>
            <span class="arrow down" @click="sortByAddressString(true)"></span>
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
import useUsers from '@/modules/features/useUsers'

export default {
  name: 'UsersTable',
  el: '#userTable',
  components: {
    UserRow
  },
  setup () {
    const { sortByUserName, sortByAge, sortByEmail, sortByAddressString, sortByCountry } = useUsers()
    return { sortByUserName, sortByEmail, sortByAge, sortByAddressString, sortByCountry }
  }
}
</script>

<style scoped src="@/assets/csss/usersTable.css">
</style>
