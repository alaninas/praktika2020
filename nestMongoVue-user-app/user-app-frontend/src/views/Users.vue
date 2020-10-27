<template>
  <div id="myUsers" class="card fluid"><p class="section">Add User</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
        <UserForm />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid"><p class="section">Search</p>
    <Suspense>
      <UsersSearch />
    </Suspense>
  </div>
  <div class="card fluid"><p class="section">Users Saved</p>
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
import UserForm from '@/components/UserForm.vue'

export default {
  name: 'Users',
  components: {
    UserForm,
    UsersSearch,
    UsersTable
  },
  setup () {
    return { }
  }
}
</script>

<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
</style>
