<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" id="emailInput" name="email" :class="httpErrorMessage.pswdReset ? 'invalid' : ''" v-model="userLoginData.email" required v-validate />
      <div class="error">{{ validationErrors.email }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="userLoginData.password" v-validate />
      <div class="error">{{ validationErrors.password }}</div>
    </div>
  </div>
  <label
    v-show="!creds.isAuthenticated"
    role="button"
    :class="isPasswordForgotten ? 'disabled button bordered' : 'responsive-padding responsive-margin tertiary'"
    @click="resetUsersPassword(isPasswordForgotten, validationErrors)">
      {{ isPasswordForgotten ? 'Check email for new password' : 'Forgot password ?' }}
  </label>
  <div class="error">{{ httpErrorMessage.pswdReset }}</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors, httpErrorMessage } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import { ref } from 'vue'

export default {
  props: {
    forgot: {
      type: Boolean,
      required: true
    }
  },
  directives: {
    validate: validate
  },
  async setup (props: Readonly<{forgot: boolean} & {}>) {
    const isPasswordForgotten = ref(props.forgot)
    const { userLoginData, resetPassword, creds } = useLogin({})

    function resetUsersPassword (param: boolean, valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      console.log('--> sending logIn to server')
      console.log(userLoginData.value.email)
      console.log(validationErrors.value)
      console.log(param)
      if (!validationErrorsCount && param === false) {
        resetPassword()
        isPasswordForgotten.value = true
      }
    }
    return { userLoginData, validationErrors, isPasswordForgotten, resetUsersPassword, creds, httpErrorMessage }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
