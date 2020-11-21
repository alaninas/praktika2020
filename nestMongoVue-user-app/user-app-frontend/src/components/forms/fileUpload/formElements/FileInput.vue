<template>
  <div class="fileinput-outer-container col-lg-6 col-md-12 col-sm-12">
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
            @change="handleFilesUpload()"
          />
        </div>
      </div>
    </span>
    <!-- TODO: possibly set inner subchild delimiter here... -->
    <ul class="file-list">
      <li v-for="(file, i) in files" :key="file">
        <div class="row">
          <div class="col-lg-8 col-md-12 col-sm-12">
            {{ file.data.name }}
          </div>
          <div class="col-lg-3 col-md-10 col-sm-9">
            <div class="w3-dark-grey" v-show="file.progress < 100" v-html="getProgressBarDisplay(file.progress)" />
          </div>
          <div class="col-lg-1 col-md-2 col-sm-3">
            <a v-show="(file.progress < 100 || !file.progress) && !file.isUploaded" class="remove-file" @click="removeFile(i)">Remove</a>
            <a v-show="file.progress === 100 && !file.isUploaded" class="unsuccessful-upload" @click="reuploadFile($route.params.id, i)">Reupload</a>
            <a v-show="file.isUploaded === true" class="successful-upload" @click="removeFile(i)">Success</a>
          </div>
        </div>
        <div class="error" v-html="getFileUploadErrorText(i)" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'
import { setEventTargetDisplay, setTargetStyleField } from '@/modules/utilities/fileUpload/targetSetters-utility'

export default {
  async setup () {
    const images: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const { files, addFilesFromInputFileList, performFileUpload, getFileUploadErrorText, removeFile } = await useFileUpload()

    function getProgressBarDisplay (pr: number | undefined): string {
      const num = pr || 0
      const s = `<div id="myBar" class="row w3-container w3-green" style="width:${num}%">${num}%</div>`
      return s
    }
    const dragEventHandler = {
      dragStart (event: DragEvent) {
        setTargetStyleField({ target: event.target, field: 'opacity', attr: '0.55' })
      },
      dragOver (event: DragEvent) {
        setEventTargetDisplay({ target: event.target, background: '#1976d229', text: 'Drop new images here...' })
      },
      dragLeave (event: DragEvent) {
        setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
      },
      drop (event: DragEvent) {
        if (event && event.dataTransfer) {
          addFilesFromInputFileList(event.dataTransfer.files)
          setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
        }
      }
    }
    function handleFilesUpload () {
      console.log('handle files input')
      const inputImages = images.value.files
      console.log(`>> input files count: ${inputImages?.length}`)
      console.log(inputImages)
      addFilesFromInputFileList(inputImages)
    }
    async function reuploadFile (id: string, i: number) {
      console.log(`reuploads file at index: ${i}, userId: ${id}`)
      await performFileUpload({ id, i })
    }
    return { dragEventHandler, getFileUploadErrorText, images, dropzone, handleFilesUpload, files, removeFile, reuploadFile, getProgressBarDisplay }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
