<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login />
    </Suspense>
    <div v-show="!loggedIn">
      <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
    </div>
  </form>
  <div v-show="loggedIn">
    <label role="button" class="button primary" v-on:click="navigateUp()">Next >></label>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { validationErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import router from '@/router'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { userLogin, loginUser, clearLoginData, loggedIn } = useLogin({ noDataReload: false })

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      console.log('--> sending logIn to server')
      console.log(validationErrors.value)
      if (!validationErrorsCount) {
        loginUser()
        clearLoginData()
        console.log(userLogin.value)
      }
    }

    function navigateUp () {
      router.push({ name: 'Users' })
    }

    return { onSubmit, validationErrors, loggedIn, navigateUp }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
