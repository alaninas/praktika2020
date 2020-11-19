<template>
<div>
  <form
    id="uploadsForm"
    name="uploadsForm"
    ref="uploadsForm"
    class="uploadsForm"
    @submit.prevent="onSubmit($route.params.id)" onkeydown="return event.key != 'Enter';"
  >
    <div class="row">
      <div class="caption-input col-lg-6 col-md-12 col-sm-12">
        <label for="imcaption">Caption for the upload:</label>
        <input
          type="text"
          id="imcaption"
          name="imcaption"
          ref="imcaption"
          @input="handleCaptionInput()"
          v-validate
        >
        <div class="error">{{ validationErrors.imcaption }}</div>
      </div>
      <!-- TODO: move to the child component -->
      <div class="fileinput-outer-container col-lg-6 col-md-12 col-sm-12" ref="fileinput">
        <!-- COMPONENT: inputzone: dropzone, browse file system button -->
        <span class="dropzone-container">
          <div class="row">
            <div
              id="dropzone"
              ref="dropzone"
              class="dropzone col-lg-10 col-md-10 col-sm-12"
              @dragover="dragEventHandler.dragOver($event)"
              @dragleave="dragEventHandler.dragLeave($event)"
              @dragend="dragEventHandler.dragLeave($event)"
              @dragstart="dragEventHandler.dragStart($event)"
              @dragenter="dragEventHandler.dragStart($event)"
              @drop="dragEventHandler.drop($event)"
            >
              Drag files here...
            </div>
            <div class="browse-files col-lg-2 col-md-2 col-sm-12">
              <label class="button bordered responside-margin responsive-padding" for="image">Browse</label>
              <input
                type="file"
                id="images"
                name="images"
                ref="images"
                multiple
                accept=".png, .jpg, .jpeg, .gif"
                size="1000"
                @change="handleFilesUpload()"
                v-validate
              />
            </div>
          </div>
        </span>
        <!-- TODO: possibly set inner subchild delimiter here... -->
        <!-- COMPONENT: file-list: display, remove, progress bar -->
        <ul class="file-list">
          <li v-for="(file, i) in files" :key="file">
            <div class="row">
              <div class="col-lg-9 col-md-12 col-sm-12">
                {{ file.data.name }}
              </div>
              <div class="col-lg-2 col-md-10 col-sm-9">
                <progress v-show="file.progress && file.progress < 100" max="100" :value.prop="file.progress || 0"></progress>
              </div>
              <div class="col-lg-1 col-md-2 col-sm-3">
                <!-- TODO: switch to v-if else -->
                <!-- the default statement will generate Remove link, the other two stay as is -->
                <a v-show="(file.progress < 100 || !file.progress) && (!file.errors || (file.errors && (file.errors.size || file.errors.format)))" class="remove-file" @click="removeFile(i)">Remove</a>
                <a v-show="file.progress === 100 && !file.errors" class="successful-upload" @click="removeFile(i)">Success</a>
                <a v-show="file.errors && file.errors.httpresponse" class="unsuccessful-upload" @click="reuploadFile($route.params.id, i)">Reupload</a>
              </div>
            </div>
            <div class="error" v-html="getFileErrorText(i)" />
          </li>
        </ul>
      </div>
      <!-- end child component -->
    </div>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin"/>
    <div class="error">{{ httpErrors.imagesresponse }}</div>
  </form>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors, httpErrors, userErrors } from '@/modules/states/formErrors'
import { onMounted, Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'

// CHILD COMPONENTS
//  fileInput /drag events and styles/
//  file-list / display UploadFiles[] elements: file.name, progress, error, remove/
//           on upload failure --> set Reupload button for the current element
export default {
  directives: {
    validate: validate
  },
  async setup () {
    const uploadsForm: Ref<HTMLFormElement> = ref(document.createElement('form'))
    const images: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const fileinput: Ref<HTMLElement> = ref(document.createElement('div'))
    const imcaption: Ref<HTMLInputElement> = ref(document.createElement('input'))

    onMounted(() => {
      dropzone.value.style.background = 'violet'
      console.log(dropzone.value) // <div/>
      const events = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
      events.forEach((evt) => {
        fileinput.value.addEventListener(evt, (e) => {
          e.preventDefault()
          e.stopPropagation()
        }, false)
      })
    })

    const { files, updateCaption, addFilesFromInput, performFileUpload, getFileErrorText, dragEventHandler, removeFile } = await useFileUpload()

    function handleCaptionInput () {
      updateCaption(imcaption.value.value)
    }
    function handleFilesUpload () {
      console.log('handle files input')
      const inputImages = images.value.files
      console.log(`>> input files count: ${inputImages?.length}`)
      console.log(inputImages)
      addFilesFromInput(inputImages)
    }
    async function onSubmit (id: string) {
      // TODO: set files.value[i].errors: size, format (see fileupload-urility constants)
      //       send data to server only if no error detected
      //       make sure to display error at the file-input: set Remove button to uppear
      if (files.value.length > 0) {
        console.log('--------->>>>>')
        for (let i = 0; i < files.value.length; i++) {
          await performFileUpload({ id, i })
        }
      }
    }
    async function reuploadFile (id: string, i: number) {
      console.log(`reuploads file at index: ${i}, userId: ${id}`)
      await performFileUpload({ id, i })
    }
    return { handleCaptionInput, dragEventHandler, getFileErrorText, validationErrors, httpErrors, userErrors, images, imcaption, dropzone, fileinput, uploadsForm, onSubmit, handleFilesUpload, files, removeFile, reuploadFile }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
