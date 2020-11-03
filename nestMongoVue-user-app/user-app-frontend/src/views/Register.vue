<template>
  <div id="myUserEdit" class="card fluid"><p class="section">Update User #{{ $route.params.id }}</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <EditUser />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid users-saved-inactive"><p class="section">Users Saved</p>
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

<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
</style>
