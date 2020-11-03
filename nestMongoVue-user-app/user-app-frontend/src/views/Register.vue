<template>
  <div id="myUserRegister" class="card fluid"><p class="section">Register New User</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <NewUser />
        </Suspense>
      </div>
    </div>
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
import NewUser from '@/components/forms/newUser/NewUser.vue'
import UsersTable from '@/components/UsersTable.vue'

export default {
  components: {
    NewUser,
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
