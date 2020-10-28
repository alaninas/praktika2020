<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="user.password" :class="userErrors.password ? 'invalid' : ''" minlength="4" v-validate />
      <div class="error">{{ validationErrors.password }} {{ userErrors.password }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label>
      <input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.passwordConfirm" :class="userErrors.passwordConfirm ? 'invalid' : ''" minlength="4" v-validate />
      <div class="error">{{ validationErrors.passwordConfirm }} {{ userErrors.passwordConfirm }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { getValidationErrors } from '@/modules/features/useValidationErrors'

export default {
  directives: {
    validate: validate
  },
  setup () {
    const { getUser, getUserErrors } = useUser({ })
    const user = getUser()
    const userErrors = getUserErrors()
    const validationErrors = getValidationErrors()
    return { user, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
