<template>
  <div v-show="isGivenUserAuthorised($route.params.id)" id="myUsers" class="card fluid"><p class="section">Add New Image</p>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <FileUpload />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid"><p class="section">Gallery #{{ $route.params.id }}</p>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <Suspense>
        <UserGallery />
      </Suspense>
      </div>
    </div>
  </div>
  <label role="button" class="responsive-padding responsive-margin secondary" @click="routerRedirect('Users')">&lt;&lt; Back to all users</label>
</template>

<script lang="ts">
import UserGallery from '@/components/UserGallery.vue'
import FileUpload from '@/components/forms/fileUpload/FileUpload.vue'
import { useLogin } from '@/modules/features/useLogin'
import { routerRedirect } from '@/modules/utilities/router-utility'

export default {
  components: {
    FileUpload,
    UserGallery
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
