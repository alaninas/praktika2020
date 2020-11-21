<template>
  <div class="error">{{ httpErrors.imagesresponse }}</div>
  <div :class="isEditFormVisible ? 'visible-picture-edit' : 'hidden-picture-edit'" id="picture-edit" ref="pictureedit">
    <Suspense>
      <EditPicture />
    </Suspense>
  </div>
  <ul class="row gallery">
    <li class="col-lg-3 col-md-6 col-sm-12" v-for="pic in user.gallery" :key="pic">
      <figure>
        <figcaption>{{ pic.file }}</figcaption>
        <img :src="pic.link" :alt="pic.altname" :title="pic.caption || ''"/>
        <br />
        <label v-show="isGivenUserAuthorised($route.params.id)" role="button" class="responsive-padding responsive-margin inverse" @click="displayPictureEdit(pic)">
          Edit
        </label>
      </figure>
    </li>
  </ul>
</template>

<script lang="ts">
import EditPicture from '@/components/userGallery/EditPicture.vue'
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLogin } from '@/modules/features/useLogin'
import { httpErrors } from '@/modules/states/formErrors'
import { isEditFormVisible, displayPictureEdit, pictureToEdit, pictureedit } from '@/modules/states/editPicture'

export default {
  components: {
    EditPicture
  },
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { user } = await useUser({ userId: userId.value, noDataReload: false, createGallery: true })
    const { isGivenUserAuthorised } = useLogin({})

    return { user, isGivenUserAuthorised, httpErrors, isEditFormVisible, displayPictureEdit, pictureToEdit, pictureedit }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/userGallery.css">
</style>
