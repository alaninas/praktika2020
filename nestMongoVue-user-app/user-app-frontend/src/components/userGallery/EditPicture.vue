<template>
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
</template>

<script lang="ts">
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { pictureToEdit, closePictureEdit } from '@/modules/states/editPicture'

export default {
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { deletePictureInGallery, updatePictureInGallery } = await useUser({ userId: userId.value })

    const isDeleteApproved = ref(false)

    async function deletePic (im: string) {
      await deletePictureInGallery(im)
      closePictureEdit()
    }
    async function onSubmit (id: string) {
      await updatePictureInGallery({ id, galleryPicture: pictureToEdit.value })
    }

    return { deletePic, pictureToEdit, isDeleteApproved, onSubmit, closePictureEdit }
  }
}
</script>

<style scoped lang="css" src="@/assets/csss/userGallery.css">
</style>
