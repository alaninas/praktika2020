<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login />
    </Suspense>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
</div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { validationErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { userLogin, loginUser, clearLoginData } = useLogin({})

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!validationErrorsCount) {
        loginUser()
        clearLoginData()
        console.log(userLogin.value)
      }
    }

    return { onSubmit, validationErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
