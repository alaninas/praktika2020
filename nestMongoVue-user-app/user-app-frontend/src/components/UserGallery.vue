<template>
  <ul class="row gallery">
    <li class="col-lg-3 col-md-6 col-sm-12" v-for="pic in user.gallery" :key="pic">
      <figure>
        <figcaption>{{ pic.file }}</figcaption>
        <img :src="pic.link" :alt="pic.name"/>
        <br />
        <label v-show="isGivenUserAuthorised($route.params.id)" role="button" class="responsive-padding responsive-margin inverse" @click="deletePic(pic.file)">
          Delete
        </label>
      </figure>
      <div class="error">{{ httpErrors.image }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLogin } from '@/modules/features/useLogin'
import { httpErrors } from '@/modules/states/formErrors'

export default {
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { user, deletePictureInGallery } = await useUser({ userId: userId.value, noDataReload: false, createGallery: true })
    const { isGivenUserAuthorised } = useLogin({})

    async function deletePic (im: string) {
      await deletePictureInGallery(im)
    }

    return { user, deletePic, isGivenUserAuthorised, httpErrors }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/userGallery.css">
</style>
