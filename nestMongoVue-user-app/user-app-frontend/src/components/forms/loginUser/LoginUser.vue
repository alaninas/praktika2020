<template>
<div>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login v-bind:forgot="isPasswordForgotten" />
    </Suspense>
    <div v-show="!creds.isAuthenticated">
      <input type="submit" value="Submit" :class="userLoginData.password.length < 4 ? 'disabled button bordered' : 'button primary responsive-padding responsive-margin'" />
    </div>
    <div class="error">{{ httpErrorMessage.userLogin }}</div>
  </form>
  <div v-show="creds.isAuthenticated">
    <label role="button" class="button primary" @click="navigateUp()">Next >></label>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { validationErrors, httpErrorMessage } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import router from '@/router'
import { ref } from 'vue'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { userLoginData, loginUser, creds } = useLogin({ noDataReload: false })
    const isPasswordForgotten = ref(false)

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      console.log('--> sending logIn to server')
      console.log(validationErrors.value)
      console.log(userLoginData.value)
      if (!validationErrorsCount && userLoginData.value.password.length > 3) {
        loginUser()
        // clearLoginData()
        console.log(userLoginData.value)
      }
    }
    async function navigateUp () {
      await router.push({ name: 'Users' })
    }
    // async function testMail () {
    //   await sendMail()
    // }

    return { onSubmit, validationErrors, creds, navigateUp, isPasswordForgotten, userLoginData, httpErrorMessage }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
