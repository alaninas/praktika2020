<template>
  <div id="myUserLogin" class="card fluid"><p class="section">Login</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <EditUser />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EditUser from '@/components/forms/editUser/EditUser.vue'

export default {
  components: {
    EditUser
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
