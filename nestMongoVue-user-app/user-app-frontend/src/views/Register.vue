<template>
  <div id="myUserRegister" class="card fluid">
    <h4 class="section">Register New User</h4>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <NewUser />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NewUser from '@/components/newUser/NewUser.vue'

export default {
  components: {
    NewUser
  },
  setup () {
    return { }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/baseUser.css">
</style>
