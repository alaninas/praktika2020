<template>
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
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors } from '@/modules/states/formErrors'
import { Ref, ref } from 'vue'
import { useFileUpload } from '@/modules/features/useFileUpload'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const imcaption: Ref<HTMLInputElement> = ref(document.createElement('input'))
    const { updateCaption } = await useFileUpload()

    function handleCaptionInput () {
      updateCaption(imcaption.value.value)
    }
    return { handleCaptionInput, validationErrors, imcaption }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
