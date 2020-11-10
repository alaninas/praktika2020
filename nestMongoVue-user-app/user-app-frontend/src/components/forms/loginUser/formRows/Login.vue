<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="emailInput">Email</label>
      <input
        type="email"
        id="emailInput"
        name="email"
        :class="httpErrors.email ? 'invalid' : ''"
        v-model="userLoginData.email"
        required
        v-validate
      />
      <div class="error">{{ validationErrors.email }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input
        type="password"
        id="userPassword"
        name="password"
        :class="httpErrors.email ? 'invalid' : ''"
        v-model="userLoginData.password"
        v-validate
      />
      <div class="error">{{ validationErrors.password }}</div>
    </div>
  </div>
  <label
    v-show="!creds.isAuthenticated"
    role="button"
    :class="isPasswordReset ? 'disabled button bordered' : 'responsive-padding responsive-margin tertiary'"
    @click="resetUsersPassword(isPasswordReset, validationErrors)">
      {{ isPasswordReset ? 'Check email for new password' : 'Forgot password ?' }}
  </label>
  <div class="error">{{ httpErrors.email }}</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors, httpErrors } from '@/modules/states/formErrors'
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
    const isPasswordReset = ref(props.forgot)
    const { userLoginData, resetPassword, creds } = useLogin({})

    async function resetUsersPassword (isPasswordResetFlag: boolean, valErrs: never[]) {
      validationErrors.value = valErrs
      const valErrsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!valErrsCount && !isPasswordReset.value) {
        isPasswordReset.value = await resetPassword(isPasswordResetFlag)
        console.log('--> inside pswd reset')
        console.log(isPasswordReset.value)
      }
    }
    return { userLoginData, validationErrors, isPasswordReset, resetUsersPassword, creds, httpErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
