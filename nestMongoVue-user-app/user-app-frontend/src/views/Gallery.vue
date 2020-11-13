<template>
  <div id="myUsers" class="card fluid"><p class="section">Add New Image</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>File upload placeholder</p>
      </div>
    </div>
  </div>
  <div class="card fluid"><p class="section">Gallery #{{ $route.params.id }}</p>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <Suspense>
        <UserImages />
      </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserImages from '@/components/UserImages.vue'
// import NewUser from '@/components/forms/newUser/NewUser.vue'

export default {
  components: {
    // NewUser,
    UserImages
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
