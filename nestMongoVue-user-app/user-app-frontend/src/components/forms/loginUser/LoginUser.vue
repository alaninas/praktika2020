<template>
<div>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login />
    </Suspense>
    <div class="row login-buttons">
      <label
        v-show="!creds.isAuthenticated"
        role="button"
        :class="isPasswordReset ? 'disabled button bordered' : 'responsive-padding responsive-margin bordered'"
        @click="resetUsersPassword(isPasswordForgotten, validationErrors)">
          {{ isPasswordForgotten ? 'Check email for new password' : 'Forgot password ?' }}
      </label>
      <label role="button" class="responsive-padding responsive-margin tertiary" @click="routerRedirect('Register')">
        Register
      </label>
      <span v-show="!creds.isAuthenticated">
        <input
          type="submit"
          value="Submit"
          :class="userLoginData.password.length < 4 ? 'disabled button bordered responsive-padding responsive-margin' : 'button primary responsive-padding responsive-margin'"
        />
      </span>
    </div>
  </form>
  <div v-show="creds.isAuthenticated">
    <label role="button" class="responsive-padding responsive-margin bordered" @click="routerRedirect('Users')">Next >></label>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { validationErrors, httpErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import { ref } from 'vue'
import { routerRedirect } from '@/modules/utilities/router-utility'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { userLoginData, loginUser, creds, resetPassword } = useLogin({ noDataReload: false })
    const isPasswordForgotten = ref(false)

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && userLoginData.value.password.length > 3) {
        loginUser()
        isPasswordForgotten.value = false
      }
    }
    async function resetUsersPassword (isPasswordResetFlag: boolean, valErrs: never[]) {
      validationErrors.value = valErrs
      const valErrsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!valErrsCount && !isPasswordForgotten.value) {
        isPasswordForgotten.value = await resetPassword(isPasswordResetFlag)
      }
    }

    return { onSubmit, validationErrors, creds, isPasswordForgotten, userLoginData, httpErrors, routerRedirect, resetUsersPassword }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
