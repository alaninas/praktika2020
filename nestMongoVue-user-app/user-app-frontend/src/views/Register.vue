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
</template>

<script lang="ts">
import NewUser from '@/components/forms/newUser/NewUser.vue'

export default {
  components: {
    NewUser
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
