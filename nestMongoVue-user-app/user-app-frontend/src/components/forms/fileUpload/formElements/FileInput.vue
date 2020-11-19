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
            size="1000"
            @change="handleFilesUpload()"
          />
        </div>
      </div>
    </span>
    <!-- TODO: possibly set inner subchild delimiter here... -->
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
            <a v-show="(file.progress < 100 || !file.progress) && !file.isUploaded" class="remove-file" @click="removeFile(i)">Remove {{file.progress}}</a>
            <a v-show="file.progress === 100 && !file.isUploaded" class="unsuccessful-upload" @click="reuploadFile($route.params.id, i)">Reupload</a>
            <a v-show="file.isUploaded === true" class="successful-upload" @click="removeFile(i)">Success</a>
          </div>
        </div>
        <div class="error" v-html="getFileErrorText(i)" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'

export default {
  async setup () {
    const images: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const { files, addFilesFromInputFileList, performFileUpload, getFileErrorText, dragEventHandler, removeFile } = await useFileUpload()

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
    return { dragEventHandler, getFileErrorText, images, dropzone, handleFilesUpload, files, removeFile, reuploadFile }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
