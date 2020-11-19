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
          v-validate
        >
        <div class="error">{{ validationErrors.imcaption }}</div>
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
        <!-- COMPONENT: filelist: display, remove, progress bar -->
        <ul class="fileList">
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
import { validationErrors, httpErrors, userErrors, setHttpErrorsField } from '@/modules/states/formErrors'
import { onMounted, Ref, ref } from 'vue'
import { putUserNewImages } from '@/modules/services'
import { AxiosRequestConfig } from 'axios'
import { to } from '@/modules/utilities/index-utility'
import { UploadFileInterface } from '@/modules/types/IUploadFile'
import { useUser } from '@/modules/features/useUser'
import { loadGallery } from '@/modules/states/user'
import { setEventTargetDisplay, setTargetStyleField } from '@/modules/utilities/fileUpload/targetSetters'

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
    const imcaption: Ref<HTMLInputElement> = ref(document.createElement('input'))

    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const fileinput: Ref<HTMLElement> = ref(document.createElement('div'))

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

    // TODO: files state
    const files: Ref<UploadFileInterface[]> = ref([])
    const { user } = await useUser({})

    // >>>> Exportable
    function addFilesFromInputFileList (inputImages: FileList | null) {
      if (inputImages) {
        for (let i = 0; i < inputImages.length; i++) {
          const f = inputImages[i]
          files.value.push({ data: f } as UploadFileInterface)
        }
      }
      console.log('-- updated files array')
      console.log(files.value)
    }
    // <<<< export end
    function handleFilesUpload () {
      console.log('handle files input')
      const inputImages = images.value.files
      console.log(`>> input files count: ${inputImages?.length}`)
      console.log(inputImages)
      addFilesFromInputFileList(inputImages)
    }
    // >>>> Exportable
    function getFileErrorText (index: number): string {
      try {
        const f = files.value[index]
        const err = f.errors
        if (!err) return ''
        const length = err.httpresponse?.length
        return length ? ` Error: ${err.httpresponse}. Upload progress: ${f.progress}` : ''
      } catch (error) {
        return ''
      }
    }
    function removeFile (index: number) {
      console.log('removes files from form')
      files.value.splice(index, 1)
      console.log('-- updated files array')
      console.log(files.value)
    }
    function setCaption ({ i, imagecaption }: { i: number; imagecaption: string }) {
      files.value[i].caption = imagecaption
    }
    function setProgress ({ i, progress }: { i: number; progress: number }) {
      files.value[i].progress = progress
    }
    function getUploadConfig (i: number): AxiosRequestConfig {
      const config: AxiosRequestConfig = {
        onUploadProgress: (progressEvent) => {
          setProgress({ i, progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) })
        }
      }
      return config
    }
    // <<<< inside useFilesUpload
    async function sendFileToServer ({ id, i, config }: { id: string; i: number; config: AxiosRequestConfig }) {
      const f = files.value[i]
      const formData = new FormData()
      formData.append('images', f.data)
      formData.append('imagecaption', f.caption)
      const [error, result] = await to(putUserNewImages({ formData, id, config }))
      if (error) {
        console.log(`----> Server error response: ${error.message}`)
        files.value[i].errors = { httpresponse: error.message }
      }
    }
    // <<<
    async function performFileUpload ({ id, i, imagecaption }: { id: string; i: number; imagecaption: string }) {
      setCaption({ i, imagecaption })
      const config = getUploadConfig(i)
      await sendFileToServer({ id, i, config })
      await loadGallery(user.value._id)
      console.log('>>>>> new user data:')
      console.log(user.value)
    }
    // << export end
    async function onSubmit (id: string) {
      console.log(`submits files to server: ${id}`)
      console.log('>> files array and caption:')
      console.log(files.value)
      console.log(imcaption.value.value)
      // TODO: set files.value[i].errors: size, format (see fileupload-urility constants)
      //       send data to server only if no error detected
      //       make sure to display error at the file-input: set Remove button to uppear
      if (files.value.length > 0) {
        console.log('--------->>>>>')
        const imagecaption = imcaption.value.value
        for (let i = 0; i < files.value.length; i++) {
          await performFileUpload({ id, i, imagecaption })
        }
      }
    }
    async function reuploadFile (id: string, i: number) {
      console.log(`reuploads file at index: ${i}, userId: ${id}`)
      const imagecaption = imcaption.value.value
      await performFileUpload({ id, i, imagecaption })
    }
    // TODO: move out
    // Send to where the file state is at ! Even better: at useFilesUpload!
    const dragEventHandler = {
      dragStart (event: DragEvent) {
        console.log('---> drag start')
        setTargetStyleField({ target: event.target, field: 'opacity', attr: '0.75' })
      },
      dragOver (event: DragEvent) {
        console.log('---> drag over')
        setEventTargetDisplay({ target: event.target, background: '#e64040', text: 'Drop new images here...' })
      },
      dragLeave (event: DragEvent) {
        console.log('---> drag leave')
        setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
      },
      drop (event: DragEvent) {
        console.log('---> drop')
        if (event && event.dataTransfer) {
          addFilesFromInputFileList(event.dataTransfer.files)
          setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
        }
      }
    }
    return { dragEventHandler, getFileErrorText, validationErrors, httpErrors, userErrors, images, imcaption, dropzone, fileinput, uploadsForm, onSubmit, handleFilesUpload, files, removeFile, reuploadFile }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
