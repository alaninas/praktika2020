<template>
  <div id="myUsers" class="card fluid"><p class="section">Update User #{{ $route.params.id }}</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <EditUser />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid users-saved"><p class="section">Users Saved</p>
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
import EditUser from '@/components/forms/editUser/EditUser.vue'
import UsersTable from '@/components/UsersTable.vue'
import router from '@/router'

export default {
  name: 'Edit',
  components: {
    EditUser,
    UsersTable
  },
  setup () {
    function navigate () {
      router.go(-1)
    }
    return { navigate }
  }
}
</script>

<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
// .users-saved table td,
// .users-saved table th {
//   color: #7d7d7d !important;
// }
</style>
