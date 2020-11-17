<template>
<div>
  <form
    id="uploadsForm"
    name="uploadsForm"
    ref="uploadsForm"
    @submit.prevent="onSubmit($route.params.id)" onkeydown="return event.key != 'Enter';"
  >
    <div class="row">
      <div class="colg-lg-6 col-md-6 col-sm-12">
        <label for="imagecaption">Caption for the upload:</label>
        <input type="text" id="imagecaption" name="imagecaption" v-validate>
        <div class="error">{{ validationErrors.imagecaption }}</div>
      </div>
      <div class="colg-lg-6 col-md-6 col-sm-12">
        <label for="image">Upload file:</label>
        <input
          type="file"
          id="files"
          name="image"
          multiple
          accept=".png, .jpg, .jpeg, .gif"
          size="1000"
          v-validate
        />
        <div class="error">{{ validationErrors.image }}</div>
      </div>
    </div>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin"/>
    <div class="error">{{ httpErrors.image }}{{ userErrors.image }}</div>
  </form>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors, httpErrors, userErrors } from '@/modules/states/formErrors'
import { Ref, ref } from 'vue'
import { putUserNewImages } from '@/modules/services'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const uploadsForm: Ref<HTMLFormElement> = ref(document.createElement('form'))

    async function onSubmit (id: string) {
      console.log(`submits files to server: ${id}`)
      if (uploadsForm.value) {
        console.log('--------->>>>>')
        const myformData = new FormData(uploadsForm.value)
        console.log(myformData.get('username2'))
        console.log(myformData.getAll('image'))
        await putUserNewImages(myformData, id)
        // const myformData2 = new FormData()
        // myformData2.append('username2', myformData.get('username') || '')
        // console.log(myformData2.get('username2'))
      }
    }
    return { validationErrors, httpErrors, userErrors, uploadsForm, onSubmit }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
