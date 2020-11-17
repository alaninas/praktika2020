<template>
  <div id="myUsers" class="card fluid">
    <h4 class="section">Add New User</h4>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <NewUser />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid">
    <h4 class="section">Search</h4>
    <Suspense>
      <UsersSearch />
    </Suspense>
  </div>
  <div class="card fluid">
    <h4 class="section">Users Saved</h4>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <Suspense>
        <UsersTable />
      </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UsersSearch from '@/components/UsersSearch.vue'
import UsersTable from '@/components/UsersTable.vue'
import NewUser from '@/components/forms/newUser/NewUser.vue'

export default {
  components: {
    NewUser,
    UsersSearch,
    UsersTable
  },
  setup () {
    return { }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/baseUser.css">
</style>
