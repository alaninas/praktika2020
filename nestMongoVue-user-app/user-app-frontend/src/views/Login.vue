<template>
  <div id="myUserLogin" class="card fluid">
    <h4 class="section">Login</h4>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <LoginUser />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginUser from '@/components/loginUser/LoginUser.vue'

export default {
  components: {
    LoginUser
  },
  setup () {
    return { }
  }
}
</script>

<style scoped lang="sss" src="@/assets/csss/baseUser.css">
</style>
