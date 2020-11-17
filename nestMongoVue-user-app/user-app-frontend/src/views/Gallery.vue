<template>
  <div v-show="isGivenUserAuthorised($route.params.id)" id="myUsers" class="card fluid">
    <h4 class="section">Add New Images</h4>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <Suspense>
          <FileUpload />
        </Suspense>
      </div>
    </div>
  </div>
  <div class="card fluid">
    <h4 class="section">Gallery #{{ $route.params.id }}</h4>
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

<style scoped lang="css" src="@/assets/csss/baseUser.css">
</style>
