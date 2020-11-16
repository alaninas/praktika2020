<template>
<div>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <label>Files
      <input type="file" id="files" ref="files" name='image' multiple @change="handleFilesUpload()" accept=".png, .jpg, .jpeg, .gif" size="1000" v-validate/>
    </label>
    <div class="error">{{ validationErrors.image }}</div>
    <label role="button" class="responsive-padding responsive-margin primary" @click="submitFiles()">Submit</label>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors } from '@/modules/states/formErrors'
import { onMounted, Ref, ref } from 'vue'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const files: Ref<any> = ref(null)
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(files.value) // <div/>
      // const el = document.getElementById('files')
      // const f = document.getElementById('files').files[0];
      const c = files.value?.files[0]
      console.log('>>> input files')
      console.log(c)
    })
    function handleFilesUpload () {
      console.log('handles file upload')
      const c = files.value?.files[0]
      console.log('>>> input files')
      console.log(c)
      console.log(c.type)
      console.log(c.name)
    }
    function submitFiles () {
      console.log('submits files to server')
      console.log('>>> val errors')
      console.log(validationErrors.value)
    }
    return { validationErrors, files, handleFilesUpload, submitFiles }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
