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
        <th>Name
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
  el: '#userTable',
  components: {
    UserRow
  },
  async setup () {
    const { usersBE } = await useUsers()
    const { sortByUserId, sortByAge, sortByEmail, sortByAddressString, sortByCountry, sortByFullName, sortByPswd, sortByName } = await useUsersFunc()
    // console.log(usersBE)
    // await getBEusers()
    // function usersRemove () {
    // const c = sortByUserId(true)
    // console.log('!!!!! sorted')
    // console.log(c)
    // const d = sortByPswd(true)
    // console.log('>>pswd sorted')
    // console.log(d)
    // const a = sortByAge(false)
    // console.log('age sorted')
    // console.log(a)
    // const e = sortByName(false)
    // console.log('--name sorted')
    // console.log(e)
    // const dd = sortByAddressString(true)
    // console.log('--address sorted')
    // console.log(dd)
    // }
    return { usersBE, sortByUserId, sortByEmail, sortByAge, sortByAddressString, sortByCountry, sortByFullName, sortByPswd }
  }
}
</script>

<style scoped src="@/assets/csss/usersTable.css">
</style>
