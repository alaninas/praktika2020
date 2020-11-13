<template>
  <div v-show="isGivenUserAuthorised($route.params.id)" id="myUsers" class="card fluid"><p class="section">Add New Image</p>
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
  <label role="button" class="responsive-padding responsive-margin secondary" @click="routerRedirect('Users')">&lt;&lt; Back to all users</label>
</template>

<script lang="ts">
import UserImages from '@/components/UserImages.vue'
import { useLogin } from '@/modules/features/useLogin'
// import NewUser from '@/components/forms/newUser/NewUser.vue'
import { routerRedirect } from '@/modules/utilities/router-utility'

export default {
  components: {
    // NewUser,
    UserImages
  },
  setup () {
    const { isGivenUserAuthorised } = useLogin({})
    return { isGivenUserAuthorised, routerRedirect }
  }
}
</script>

<style scoped lang="scss">
div.card.fluid > p {
  font-variant-caps: all-small-caps;
}
</style>
