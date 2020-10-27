<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>UserId
          <div class="sort-arrows">
            <span class="arrow" @click="sortByUserId(false)"></span>
            <span class="arrow down" @click="sortByUserId(true)"></span>
          </div> | Del
        </th>
        <th>Password
          <div class="sort-arrows">
            <span class="arrow" @click="sortByPswd(false)"></span>
            <span class="arrow down" @click="sortByPswd(true)"></span>
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
        <th>Fullname
          <div class="sort-arrows">
            <span class="arrow" @click="sortByName(false)"></span>
            <span class="arrow down" @click="sortByName(true)"></span>
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
      <Suspense>
        <UserRow />
      </Suspense>
    </tbody>
  </table>
</template>

<script lang="ts">
import UserRow from '@/components/UserRow.vue'
import useUsers, { useUsersFunc } from '@/modules/features/useUsers'

export default {
  name: 'UsersTable',
  components: {
    UserRow
  },
  async setup () {
    const { usersBE } = await useUsers()
    const { sortByUserId, sortByAge, sortByEmail, sortByAddressString, sortByCountry, sortByFullName, sortByPswd } = await useUsersFunc()
    return { usersBE, sortByUserId, sortByEmail, sortByAge, sortByAddressString, sortByCountry, sortByFullName, sortByPswd }
  }
}
</script>

<style scoped src="@/assets/csss/usersTable.css">
</style>
