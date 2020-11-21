<template>
  <div id="myUserEdit" class="card fluid">
    <h4 class="section">Update User #{{ $route.params.id }}</h4>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <EditUser />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid users-saved-inactive">
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
import EditUser from '@/components/editUser/EditUser.vue'
import UsersTable from '@/components/UsersTable.vue'

export default {
  components: {
    EditUser,
    UsersTable
  },
  setup () {
    return { }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/baseUser.css">
</style>
