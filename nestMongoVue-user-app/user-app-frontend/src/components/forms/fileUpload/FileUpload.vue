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
        <label for="imagecaption">Caption for the upload:</label>
        <input
          type="text"
          id="imagecaption"
          name="imagecaption"
          ref="imagecaption"
          v-validate
        >
        <div class="error">{{ validationErrors.imagecaption }}</div>
      </div>
      <!-- TODO: move to the child component -->
      <div class="fileinput-outer-container col-lg-6 col-md-12 col-sm-12" ref="fileinput">
        <!-- COMPONENT: inputzone: dropzone, browse file system button -->
        <span class="fileinput-inner-container">
          <div class="row">
            <div
              id="dropzone"
              ref="dropzone"
              class="dropzone col-lg-10 col-md-10 col-sm-12"
              @dragover="handleDragOver($event)"
              @dragleave="handleDragLeave($event)"
              @dragend="handleDragLeave($event)"
              @dragstart="handleDragStart($event)"
              @dragenter="handleDragStart($event)"
              @drop="handleDrop($event)"
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
        <!-- COMPONENT: filelist: display, remove, progress bar -->
        <ul class="fileList">
          <li v-for="(file, i) in files" :key="file">
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12">
                {{ file.name }}
              </div>
              <div class="col-lg-1 col-md-12 col-sm-12">
                <a v-show="percentCompleted < 100" class="remove-file" @click="removeFile(i)">Remove</a>
                <a v-show="percentCompleted === 100" class="successful-upload" @click="removeFile(i)">Success</a>
              </div>
            </div>
          </li>
        </ul>
        <progress v-show="percentCompleted < 100" max="100" :value.prop="percentCompleted"></progress>
        <div class="error">{{ validationErrors.images }}</div>
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
import { putUserNewImages } from '@/modules/services'
import { AxiosRequestConfig } from 'axios'

// STATE
// create UploadFiles interface:
//  data: File
//  errors: FileErrors /size, format, response/
//  progress: progress-percentage
//  caption: string
// setters, getters

// FEATURE
// useUploadFiles:
//  create refs, formdata /deprecated, use UploadFiles to send info to server/
//  manipulate with files --> onto formdata /deprecated, skip the step/

// CHILD COMPONENTS
//  fileInput /drag events and styles/
//  fileList / display UploadFiles[] elements: file.name, progress, error, remove/
//           on upload failure --> set Reupload button for the current element
export default {
  directives: {
    validate: validate
  },
  async setup () {
    const uploadsForm: Ref<HTMLFormElement> = ref(document.createElement('form'))
    const images: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const imagecaption: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const files: Ref<File[]> = ref([])
    const myformData = new FormData()

    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const fileinput: Ref<HTMLElement> = ref(document.createElement('div'))

    const percentCompleted = ref(0)

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

    function handleFilesUpload () {
      console.log('handle files input')
      const c = images.value.files
      console.log(`>> input files count: ${c?.length}`)
      console.log(c)
      if (c) {
        for (let i = 0; i < c.length; i++) {
          const f = c[i]
          files.value.push(f)
        }
      }
      console.log('-- updated files array')
      console.log(files.value)
    }
    function removeFile (index: number) {
      console.log('removes files from form')
      files.value.splice(index, 1)
      myformData.delete('images')
      for (let i = 0; i < files.value.length; i++) {
        const f = files.value[i]
        myformData.append('images', f)
      }
      console.log(myformData.getAll('images'))
    }
    async function onSubmit (id: string) {
      console.log(`submits files to server: ${id}`)
      console.log('>> files array:')
      console.log(files.value)
      if (files.value) {
        console.log('--------->>>>>')
        myformData.delete('images')
        myformData.delete('imagecaption')
        for (let i = 0; i < files.value.length; i++) {
          const f = files.value[i]
          myformData.append('images', f)
        }
        console.log(myformData.getAll('images'))
        myformData.append('imagecaption', imagecaption.value.value)
        console.log(myformData.get('imagecaption'))
        console.log(imagecaption.value.value)
        // TODO
        // foreach file run: put, set progress, set error
        const config: AxiosRequestConfig = {
          onUploadProgress: function (progressEvent) {
            percentCompleted.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        }
        await putUserNewImages(myformData, id, config)
      }
    }
    // Drag n drop handlers
    function handleDragStart (event: DragEvent) {
      console.log('---> drag start')
      if (event.target && (event.target as HTMLElement).style) (event.target as HTMLElement).style.opacity = '0.75'
    }
    function handleDragOver (event: DragEvent) {
      console.log('---> drag over')
      if (event.target && (event.target as HTMLElement).style) (event.target as HTMLElement).style.background = '#e64040'
      if (event.target) (event.target as HTMLElement).innerHTML = 'Drop new images here...'
    }
    function handleDragLeave (event: DragEvent) {
      console.log('---> drag leave')
      if (event.target && (event.target as HTMLElement).style) (event.target as HTMLElement).style.background = ''
      if (event.target && (event.target as HTMLElement).style) (event.target as HTMLElement).style.opacity = ''
      if (event.target) (event.target as HTMLElement).innerHTML = 'Drag files here...'
    }
    function handleDrop (event: DragEvent) {
      console.log('---> drop')
      if (event && event.dataTransfer) {
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          files.value.push(event.dataTransfer.files[i])
        // getImagePreviews()
        }
        // dropzone.value.style.background = ''
        if (event.target) (event.target as HTMLElement).style.background = ''
        if (event.target) (event.target as HTMLElement).style.opacity = ''
        if (event.target) (event.target as HTMLElement).innerHTML = 'Drag files here...'
      }
    }
    return { validationErrors, httpErrors, userErrors, percentCompleted, images, imagecaption, dropzone, fileinput, uploadsForm, onSubmit, handleFilesUpload, files, removeFile, handleDrop, handleDragOver, handleDragLeave, handleDragStart }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
