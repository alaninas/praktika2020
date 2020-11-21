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
import DropZone from '@/components/fileUpload/formElements/fileInputElements/DropZone.vue'
import FileList from '@/components/fileUpload/formElements/fileInputElements/FileList.vue'

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

<style lang="css">
.fileinput-outer-container input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 0;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  cursor: pointer;
}
</style>
