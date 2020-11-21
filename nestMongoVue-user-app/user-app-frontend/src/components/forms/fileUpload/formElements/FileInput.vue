<template>
  <div class="fileinput-outer-container col-lg-6 col-md-12 col-sm-12">
    <Suspense>
      <DropZone />
    </Suspense>
    <Suspense>
      <FileList />
    </Suspense>
  </div>
</template>

<script lang="ts">
import DropZone from '@/components/forms/fileUpload/formElements/fileInputElements/DropZone.vue'
import FileList from '@/components/forms/fileUpload/formElements/fileInputElements/FileList.vue'

export default {
  components: {
    DropZone,
    FileList
  },
  setup () {
    return {}
  }
}
</script>

<style src="@/assets/csss/fileInput.css">
</style>
