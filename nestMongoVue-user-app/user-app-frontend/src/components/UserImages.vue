<template>
  <ul class="row gallery">
    <li class="col-lg-3 col-md-6 col-sm-12" v-for="image in user.images" :key="image">
      <!-- {{ image }} -->
      <!-- <label role="button" class="responsive-padding responsive-margin inverse" @click="deleteI(image)">Delete</label> -->
      <figure v-show="image.length > 0">
        <figcaption>{{ image }}</figcaption>
        <img :src="getGalleryLinkText(image, $route.params.id)" />
        <label v-show="isGivenUserAuthorised($route.params.id)" role="button" class="responsive-padding responsive-margin inverse" @click="deleteI(image)">Delete</label>
        <!-- <img :src="require(`@/assets/uploads/${$route.params.id}/${image}`)" /> -->
      </figure>
    </li>
  </ul>
</template>

<script lang="ts">
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLogin } from '@/modules/features/useLogin'

export default {
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { user, deleteImage } = await useUser({ userId: userId.value, noDataReload: false })
    const { isGivenUserAuthorised } = useLogin({})

    async function deleteI (im: string) {
      await deleteImage(im)
    }
    function getGalleryLinkText (image: string | undefined, id: string): string {
      const length = image?.length
      console.log(image)
      return length ? require(`@/assets/uploads/${id}/${image}`) : '#'
    }
    return { user, deleteI, getGalleryLinkText, isGivenUserAuthorised }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/userImages.css">
</style>
