<template>
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
</template>

<script lang="ts">
import { useFileUpload } from '@/modules/features/useFileUpload'

export default {
  async setup () {
    const { files, performFileUpload, getFileUploadErrorText, removeFile } = await useFileUpload()

    function getProgressBarDisplay (pr: number | undefined): string {
      const num = pr || 0
      return `<div id="myBar" class="row w3-container w3-green" style="width:${num}%">${num}%</div>`
    }
    async function reuploadFile (id: string, i: number) {
      await performFileUpload({ id, i })
    }
    return { getFileUploadErrorText, files, removeFile, reuploadFile, getProgressBarDisplay }
  }
}
</script>

<style src="@/assets/csss/fileList.css">
</style>
