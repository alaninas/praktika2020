<template>
  <div class="error">{{ httpErrors.imagesresponse }}</div>
  <div :class="isEditFormVisible ? 'visible-picture-edit' : 'hidden-picture-edit'" id="picture-edit" ref="pictureedit">
    <div class="row picture-edit-header">
      <h5>Picture &lt;{{ pictureToEdit.file }}&gt; Edit</h5>
      <label role="button" class="responsive-padding responsive-margin bordered" @click="closePictureEdit()">
        Close edit
      </label>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <figure>
          <img :src="pictureToEdit.link" :alt="pictureToEdit.altname"/>
        </figure>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <label role="button" class="responsive-padding responsive-margin inverse" v-show="!isDeleteApproved" @click="isDeleteApproved = !isDeleteApproved">Delete picture</label>
        <div class="card fluid warning" v-show="isDeleteApproved">
          <p>Please confirm picture action
            <label role="button" class="responsive-padding responsive-margin inverse" @click="deletePic(pictureToEdit.file)">Delete</label>
            <label role="button" class="responsive-padding responsive-margin bordered" @click="isDeleteApproved = !isDeleteApproved">Cancel delete</label>
          </p>
        </div>
        <form
            id="editForm"
            name="editForm"
            class="editForm"
            @submit.prevent="onSubmit($route.params.id)" onkeydown="return event.key != 'Enter';"
          >
          <label for="imcaption">Picture caption:</label>
          <input
            type="text"
            id="edit-imcaption"
            name="edit-imcaption"
            v-model="pictureToEdit.caption"
          />
          <input type="submit" value="Submit" class="responsive-padding responsive-margin primary" />
        </form>
      </div>
    </div>
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
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { Ref, ref } from 'vue'
import { useLogin } from '@/modules/features/useLogin'
import { httpErrors } from '@/modules/states/formErrors'
import { GalleryInterface } from '@/modules/types/IUser'

export default {
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { user, deletePictureInGallery, updatePictureInGallery } = await useUser({ userId: userId.value, noDataReload: false, createGallery: true })
    const { isGivenUserAuthorised } = useLogin({})

    // TODO: refactor
    const isEditFormVisible = ref(false)
    const pictureToEdit: Ref<GalleryInterface> = ref({} as GalleryInterface)
    const isDeleteApproved = ref(false)
    const pictureedit: Ref<HTMLElement> = ref(document.createElement('div'))
    // TODO: fileupdate doesnt belong with fileupload module

    function displayPictureEdit (picture: GalleryInterface) {
      if (!isEditFormVisible.value) isEditFormVisible.value = !isEditFormVisible.value
      pictureToEdit.value = picture
      // const el = document.getElementById('picture-edit')
      // if (el) el.scrollIntoView(false)
      if (pictureedit.value) pictureedit.value.scrollIntoView(false)
    }
    function closePictureEdit () {
      isEditFormVisible.value = !isEditFormVisible.value
      pictureToEdit.value = {} as GalleryInterface
    }
    async function deletePic (im: string) {
      await deletePictureInGallery(im)
      isEditFormVisible.value = false
    }
    async function onSubmit (id: string) {
      console.log('kkkkkkkkkkkk')
      await updatePictureInGallery({ id, galleryPicture: pictureToEdit.value })
    }

    return { user, deletePic, isGivenUserAuthorised, httpErrors, isEditFormVisible, displayPictureEdit, closePictureEdit, pictureToEdit, isDeleteApproved, onSubmit, pictureedit }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/userGallery.css">
</style>
