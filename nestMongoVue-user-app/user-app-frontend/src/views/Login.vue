<template>
  <div id="myUserLogin" class="card fluid"><p class="section">Login</p>
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
import LoginUser from '@/components/forms/loginUser/LoginUser.vue'

export default {
  components: {
    LoginUser
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
