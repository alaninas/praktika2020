<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <SigninInfo />
    <PersonalData />
    <AddressAutocomplete />
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
</div>
</template>

<script lang="ts">
import { watchEffect } from 'vue'
import validate from '@/modules/directives/validate'
import AddressAutocomplete from '@/components/formRows/AddressAutocomplete.vue'
import SigninInfo from '@/components/formRows/SigninInfo.vue'
import PersonalData from '@/components/formRows/PersonalData.vue'
import UserInterface from '@/modules/types/IUser'
import { user } from '@/modules/features/useUser'
import { users } from '@/modules/features/useUsers'
import { validationErrors, userErrors, resetErrors, assignUserErrors } from '@/modules/features/useErrors'

export default {
  name: 'UserForm',
  components: {
    SigninInfo,
    PersonalData,
    AddressAutocomplete
  },
  directives: {
    validate: validate
  },
  setup () {
    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        users.value.push(user.value)
        user.value = {} as UserInterface
        resetErrors()
      }
    }

    watchEffect(() => {
      userErrors.value = assignUserErrors(user.value)
    })
    return { user, onSubmit, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
