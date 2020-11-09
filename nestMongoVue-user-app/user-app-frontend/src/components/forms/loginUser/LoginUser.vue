<template>
<div>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login v-bind:forgot="isPasswordForgotten" />
    </Suspense>
    <div v-show="!isLoggedIn">
      <input type="submit" value="Submit" :class="userLoginData.password.length < 4 ? 'disabled button bordered' : 'button primary responsive-padding responsive-margin'" />
    </div>
  </form>
  <div v-show="isLoggedIn">
    <label role="button" class="button primary" @click="navigateUp()">Next >></label>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { validationErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import router from '@/router'
import { ref } from 'vue'
// import { sendMail } from '@/modules/services/mail-service'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { userLoginData, loginUser, clearLoginData, isLoggedIn } = useLogin({ noDataReload: false })
    const isPasswordForgotten = ref(false)

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      console.log('--> sending logIn to server')
      console.log(validationErrors.value)
      console.log(userLoginData.value)
      if (!validationErrorsCount && userLoginData.value.password.length > 3) {
        loginUser()
        clearLoginData()
        console.log(userLoginData.value)
      }
    }
    async function navigateUp () {
      await router.push({ name: 'Users' })
    }
    // async function testMail () {
    //   await sendMail()
    // }

    return { onSubmit, validationErrors, isLoggedIn, navigateUp, isPasswordForgotten, userLoginData }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
