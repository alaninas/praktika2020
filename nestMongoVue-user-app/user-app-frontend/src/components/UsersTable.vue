<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>UserId
          <div class="sort-arrows">
            <span class="arrow" @click="sortById(false)"></span>
            <span class="arrow down" @click="sortById(true)"></span>
          </div>
        </th>
        <th>
          Gallery
        </th>
        <th>Age
          <div class="sort-arrows">
            <span class="arrow" @click="sortByAge(false)"></span>
            <span class="arrow down" @click="sortByAge(true)"></span>
          </div>
        </th>
        <th>Website
          <div class="sort-arrows">
            <span class="arrow" @click="sortByWebsite(false)"></span>
            <span class="arrow down" @click="sortByWebsite(true)"></span>
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
            <span class="arrow" @click="sortByFullname(false)"></span>
            <span class="arrow down" @click="sortByFullname(true)"></span>
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
            <span class="arrow" @click="sortByAddress(false)"></span>
            <span class="arrow down" @click="sortByAddress(true)"></span>
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
import { useUsers } from '@/modules/features/useUsers'

export default {
  components: {
    UserRow
  },
  async setup () {
    const { sortByEmail, sortByAge, sortByAddress, sortByFullname, sortById, sortByCountry, sortByWebsite } = await useUsers()
    return { sortById, sortByAge, sortByAddress, sortByFullname, sortByEmail, sortByCountry, sortByWebsite }
  }
}
</script>

<style src="@/assets/csss/usersTable.css">
</style>
