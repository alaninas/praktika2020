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
</template>

<script lang="ts">
import EditUser from '@/components/forms/editUser/EditUser.vue'
import router from '@/router'

export default {
  name: 'Edit',
  components: {
    EditUser
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
</style>
