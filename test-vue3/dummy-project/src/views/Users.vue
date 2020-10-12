<template>
  <div id="myUsers" class="card fluid"><p class="section">Add User</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <UserForm />
      </div>
    </div>
  </div>
  <div class="card fluid"><p class="section">Search</p>
    <UsersSearch />
  </div>
  <div class="card fluid"><p class="section">Users Saved</p>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <UserTable />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UsersSearch from '@/components/UsersSearch.vue'
import UserTable from '@/components/UserTable.vue'
import UserForm from '@/components/UserForm.vue'

export default {
  el: '#myUsers',
  name: 'Users',
  components: {
    UserForm,
    UsersSearch,
    UserTable
  },
  setup () {
    return { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
</style>
