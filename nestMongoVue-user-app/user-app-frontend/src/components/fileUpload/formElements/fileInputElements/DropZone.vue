<template>
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
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'
import { setEventTargetDisplay, setTargetStyleField } from '@/modules/utilities/fileUpload/targetSetters-utility'

export default {
  async setup () {
    const images: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const dropzone: Ref<HTMLElement> = ref(document.createElement('div'))
    const { files, addFilesFromInputFileList, getFileUploadErrorText } = await useFileUpload()

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
      addFilesFromInputFileList(images.value.files)
    }
    return { dragEventHandler, getFileUploadErrorText, images, dropzone, handleFilesUpload, files }
  }
}
</script>

<style src="@/assets/csss/dropZone.css">
</style>
