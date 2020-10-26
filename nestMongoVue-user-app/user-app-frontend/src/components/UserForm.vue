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
import validate from '@/modules/directives/validate'
import AddressAutocomplete from '@/components/formRows/AddressAutocomplete.vue'
import SigninInfo from '@/components/formRows/SigninInfo.vue'
import PersonalData from '@/components/formRows/PersonalData.vue'
import UserInterface from '@/modules/types/IUser'
import { useUser } from '@/modules/features/useUser'
import { validationErrors, resetErrors } from '@/modules/features/useErrors'

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
  async setup () {
    const { getUser, getUserErrors } = useUser()
    const user = getUser()
    const userErrors = getUserErrors()
    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        // users.value.push(user.value)
        console.log('Sending user data to server')
        console.log(user.value)
        user.value = {} as UserInterface
        resetErrors()
      }
    }
    return { user, onSubmit, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
