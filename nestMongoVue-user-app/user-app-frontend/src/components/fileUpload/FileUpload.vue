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
      <Suspense>
        <CaptionInput />
      </Suspense>
      <Suspense>
        <FileInput />
      </Suspense>
    </div>
    <input
      type="submit"
      value="Submit"
      :class="httpErrors.imagescount || !files.length ? 'disabled button bordered responsive-padding responsive-margin' : 'button primary responsive-padding responsive-margin'"
    />
    <div class="error">{{ httpErrors.imagescount }}</div>
    <div class="error">{{ httpErrors.imagesresponse }}</div>
  </form>
</div>
</template>

<script lang="ts">
import CaptionInput from '@/components/fileUpload/formElements/CaptionInput.vue'
import FileInput from '@/components/fileUpload/formElements/FileInput.vue'
import { httpErrors } from '@/modules/states/formErrors'
import { onMounted, Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'

export default {
  components: {
    CaptionInput,
    FileInput
  },
  async setup () {
    const uploadsForm: Ref<HTMLFormElement> = ref(document.createElement('form'))

    onMounted(() => {
      const events = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
      events.forEach((evt) => {
        uploadsForm.value.addEventListener(evt, (e) => {
          e.preventDefault()
          e.stopPropagation()
        }, false)
      })
    })

    const { files, cleanUploads, submitFiles } = await useFileUpload()

    async function onSubmit (id: string) {
      await cleanUploads()
      await submitFiles(id)
    }
    return { httpErrors, uploadsForm, onSubmit, files }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
