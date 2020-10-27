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
import AddressAutocomplete from '@/components/forms/newUser/formRows/AddressAutocomplete.vue'
import SigninInfo from '@/components/forms/newUser/formRows/SigninInfo.vue'
import PersonalData from '@/components/forms/newUser/formRows/PersonalData.vue'
import UserInterface from '@/modules/types/IUser'
import { useUser } from '@/modules/features/useUser'
import { getValidationErrors, resetValidationErrors } from '@/modules/features/useValidationErrors'
import { useUsers } from '@/modules/features/useUsers'

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
    const { user, userErrors, resetUserErrors } = useUser()
    const { addUser } = await useUsers()
    const validationErrors = getValidationErrors()

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        console.log('--> Sending user data to server')
        console.log(user.value)
        addUser(user.value)
        user.value = {} as UserInterface
        resetValidationErrors()
        resetUserErrors()
      }
    }

    return { user, onSubmit, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
