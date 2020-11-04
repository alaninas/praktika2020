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
<label role="button" class="button tertiary responsive-padding responsive-margin" @click="testIn()">Test auth login</label>
<label role="button" class="button inverse responsive-padding responsive-margin" @click="testOut()">Test auth logout</label>
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
    // loginData.value = loadState({ email: 'u230@gm.com', password: 'pswd' }).value
    // const { userLogin, loggedIn, loginUser, logoutUser } = useLogin({ userLoginInit: { email: 'u230@gm.com', password: 'pswd' }, noDataReload: false })
    const { userLogin, loginUser, logoutUser } = useLogin({})

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!validationErrorsCount) {
        // addUser(user.value)
        // clearUserData()
        console.log(userLogin.value)
      }
    }

    async function testIn () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const c = await loginUser()
      return true
    }
    function testOut () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const c = logoutUser()
      return true
    }

    return { onSubmit, validationErrors, testIn, testOut }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
